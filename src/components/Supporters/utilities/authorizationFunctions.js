import { auth, gProvider, fProvider } from './auth0';
import envURL from '../../../envURL';
import {signInValidator} from './signInValidator'


/**
 * @function saveTokenLocally to be chained after the token is received
 * if rememberMe is true, take the token in the response and save it in localstorage
 * else save it on sessionCookies
 * @param {*} token a JWT token
 * @param {*} rememberMe  a boolean to decide where the token is stored.
 */
const saveTokenLocally = (token, rememberMe) => {
    if (rememberMe === true) return localStorage.setItem('auth_access_token', token);
    return sessionStorage.setItem('auth_access_token', token)
}
const removeTokensFromStorage = () => {
    sessionStorage.removeItem('auth_access_token');
    localStorage.removeItem('auth_access_token');
    sessionStorage.removeItem('hashed_access');
}
/**
 * @function logOut  logs out the user from services,
 * locates the token,delete it from localStorage, and redirects to '/ '
 * @param navigate is an instance of the useHistory hook
 * @todo before using it, prevent default behavior from event, in case it's called inside form.
 */
const logOut = (navigate, dispatch) => {
    auth().signOut()
        .then(removeTokensFromStorage())
        .then(dispatch({ type: 'SET_PROFILE', payload: {} }))
        .then(dispatch({ type: 'SET_USER_IS_LOGGED_IN', payload: false }))
        .then(navigate('/'))
        .catch(console.err)
}


/**
 * @function logIn logs the user with convetional techniques.
 * @param {*} user an object {email:string, password:string, rememberMe:boolean}
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 * @param {*} dispatch ({ type: 'SET_USER_IS_LOGGED_IN', payload: boolean })
 * @param navigate is an instance of the useHistory hook
 */
const logIn = (user, options) => {
    const {setRequest, setErrors, setResponse, dispatch, navigate} = options;
    if (signInValidator(user).valid) {
        setRequest(true);
        const sanitizedData = signInValidator(user).sanitized;
        fetch(`${envURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(sanitizedData),
        })
            .then((res) => res.json()
                .then(jsonRes => {
                    if (jsonRes.token) {
                        saveTokenLocally(jsonRes.token, user.rememberMe);
                        dispatch({ type: 'SET_USER_IS_LOGGED_IN', payload: res.ok });
                    }
                    if(res.ok) navigate('/portfolio/')
                    return { successful: res.ok, message: jsonRes.message, link: jsonRes.link }
                }))
            .then(setResponse)
            .then(() => setRequest(false))
            .catch(console.error);
    } else {
        setErrors(signInValidator(user).errors);
    }
}

/**
 * @function signWithGoogleOrFB logs the user with the Auth0 technique.
 * @param {*} whichService string (fb | google)
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 * @param {*} dispatch ({ type: 'SET_USER_IS_LOGGED_IN', payload: boolean })
 * @param {*} rememberMe boolean to indicate if the data should be saved permantently.
 * @param navigate is an instance of the useHistory hook
 */
const signWithGoogleOrFB = (whichService, options) => {
    const {setRequest, setResponse, rememberMe, dispatch, navigate} = options;
    const provider = (whichService === 'fb') ? fProvider : gProvider;
    setRequest(true);
    auth().signInWithPopup(provider)
        .then((result) => {
            const { user } = result;
            const names = user.displayName.split(" ");
            const reqBody = { cu_id: user.uid, email: user.email, firstName: names[0], lastName: names[names.length - 1] };

            fetch(`${envURL}/auth/withProvider`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(reqBody),
            })
                .then((res) => res.json()
                    .then(jsonRes => {
                        if (jsonRes.token) {
                            saveTokenLocally(jsonRes.token, rememberMe);
                            dispatch({ type: 'SET_USER_IS_LOGGED_IN', payload: res.ok });
                        }
                        if(res.ok) navigate('/portfolio/')
                        return { successful: res.ok, message: jsonRes.message }
                    }))
                .then(setResponse)
                .then(() => setRequest(false))
                .catch(console.error);
        })
        .catch(err => console.log(err.message));
};


/**
 * @function fetchHashedAccess verifies in sessionStorage for {hashed_access}. 
 * if it does not find it,  it hits auth/userIsLoggedIn with the access_token in the body. 
 * if it receives a negative answer (access_token.split('true')[1]==='401'), it will delete the jwt_token. 
 * else If it receives (access_token.split('true')[1]==='200'), it stores it in sessionStorage. 
 */
const fetchHashedAccess = () => {
    return new Promise((resolve, reject) => {
        const hashedAccess = sessionStorage.getItem('hashed_access');
        const token = (localStorage.getItem('auth_access_token'))
            ? localStorage.getItem('auth_access_token')
            : sessionStorage.getItem('auth_access_token')

        if (!token) return reject(new Error('there is not an existing token'));
        if (!hashedAccess) {
            const results = fetch(`${envURL}/auth/userIsLoggedIn`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({ token })
                })
                .then(res => res.json())
                .then((hash) => {
                    const comparisonResult = hash.split('code')[1];
                    const hashedValue = hash.split('code')[0];
                    if (comparisonResult === '200') {
                        sessionStorage.setItem('hashed_access', hashedValue)
                        return { hashedAccess: hashedValue, token };
                    }
                    return removeTokensFromStorage();
                })
                .catch((e) => reject(new Error(`there was an issue while getting the data${e}`)));
            resolve(results);
        }

        return resolve({ hashedAccess, token });
    });
}

/**
 * @function fetchPayloadFromJWT it receives JWT token, fetches payload and returns it
 * @param token a valid  JWT token
 */
const fetchPayloadFromJWT = (token) => (token) ? JSON.parse(window.atob(token.split('.')[1])) : '';

/**
 * @function compareAccessKeys compares access_token in sessionStorage 
 * and the hashed_access stored in the jwtToken payload. 
 * It returns a function with the result of the evaluation
 */
const compareAccessKeys = ({ hashedAccess, token }) => {
    const payload = fetchPayloadFromJWT(token);
    if (!payload.hashed_access === hashedAccess) removeTokensFromStorage();
    return payload.hashed_access === hashedAccess

}


/**
 * @function confirmLoggedIn fetches tokens, compares them @returns boolean
 */
const confirmLoggedIn = async () => {
    // return false;
    const res = await fetchHashedAccess()
        .then(compareAccessKeys)
        .catch((e) => { 
            // console.log(e.message) 
        });
   
    return res
}

const getIdFromLocalToken = () => {
    const token = (localStorage.getItem('auth_access_token'))
        ? localStorage.getItem('auth_access_token')
        : sessionStorage.getItem('auth_access_token');
    return (token) ? JSON.parse(window.atob(token.split('.')[1])) : {};
}

// eslint-disable-next-line import/prefer-default-export
export { logIn, signWithGoogleOrFB, logOut, confirmLoggedIn, fetchPayloadFromJWT, getIdFromLocalToken }