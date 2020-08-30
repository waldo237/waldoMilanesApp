import escape from "validator/es/lib/escape";
import { storage } from '../Supporters/utilities/auth0';
import envURL from "../../envURL";
import { fetchPayloadFromJWT } from '../Supporters/utilities/authorizationFunctions';

const profileValidator = (user) => {
  console.log(user)
  const res = {
    valid: true,
    errors: [],
  };
  if (user){
  if (!user.firstName) {
    res.errors.push({
      type: "firstName",
      message: "Please do not forget include your first name.",
    });
    res.valid = false;
  } else if (user.firstName.length > 20) {
    res.errors.push({
      type: "firstName",
      message: "The first name shouldn't be longer than 20 characters.",
    });
    res.valid = false;
  }
  if (!user.lastName) {
    res.errors.push({
      type: "lastName",
      message: "Please do not forget include your last name.",
    });
    res.valid = false;
  } else if (user.lastName > 20) {
    res.errors.push({
      type: "lastName",
      message: "The last name shouldn't be longer than 20 characters.",
    });
    res.valid = false;
  }

  if (res.valid) {
    res.sanitized = {
      firstName: escape(user.firstName.trim()),
      lastName: escape(user.lastName.trim()),
      email: escape(user.email.trim()),
      photoURL: user.photoURL
    };
  }
}
return res;
};

const getTokenFromLocalStorage = () => {
  return (localStorage.getItem('auth_access_token'))
    ? localStorage.getItem('auth_access_token')
    : sessionStorage.getItem('auth_access_token');
}
/**
 * @function saveChanges sends the new changes to the server.
 * @param options:object containing the other parameters
 * @param {*} profileCopy:object {email:string, firtName:string, lastName:string,  photoURL:string}
 * @param {*} setRequest :function useState(requestStarted:boolean)
 * @param {*} setResponse :function useState(object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors :function useState(errors:array)
 *  @param pathname:string -- a URI
 */
const saveChanges = (options) => {
  const { profileCopy, setRequest, setResponse, setErrors, pathname, dispatch, setUnsavedChanges } = options;
  const token = getTokenFromLocalStorage();
  if (profileValidator(profileCopy).valid) {
    setRequest(true);
    const sanitizedData = profileValidator(profileCopy).sanitized;
    fetch(`${envURL}${pathname}`, {
      method: "PUT",
      headers: {
        'Authorization': `JWT ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(sanitizedData),
    })
      .then((res) => {
        return res.json()
          .then(jsonRes => {
            return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
          });
      })
      .then(setResponse)
      .then(dispatch({ type: 'SET_PROFILE', payload: { ...profileCopy } }))
      .then(() => setUnsavedChanges(false))
      .then(() => setRequest(false))
      .catch(console.error);
  } else {
    setErrors(profileValidator(profileCopy).errors);
  }
}

/**
 * @function fetchProfile calls API to get the user profile.
 * @param {*} setData :function useState(user:object)
 * @param pathname:string -- a URI
 */
const fetchProfile = (pathname, dispatch) => {
  const token = getTokenFromLocalStorage();
  const { email } = fetchPayloadFromJWT(token);
  if (token) {
    fetch(`${envURL}${pathname}`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'SET_PROFILE', payload: data }))
      .catch(console.error);
  }
}
/**
 * @function cancelAccount calls API to request an the cancelation of the account.
 * @param options:object containing the other parameters
 * @param {*} profileCopy :object {email:string, firtName:string, lastName:string,  photoURL:string}
 * @param {*} setRequest :function useState(requestStarted:boolean)
 * @param {*} setResponse :function useState(object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors :function useState(errors:array)
 * @param {*} pathname:string -- a URI
 */
const cancelAccount = (options) => {
  const { profileCopy, setRequest, setResponse, setErrors, pathname } = options;
  const token = getTokenFromLocalStorage();
  if (profileValidator(profileCopy).valid) {
    setRequest(true);
    const sanitizedData = profileValidator(profileCopy).sanitized;
    fetch(`${envURL}${pathname}`, {
      method: "DELETE",
      headers: {
        'Authorization': `JWT ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(sanitizedData),
    })
      .then((res) => {
        return res.json()
          .then(jsonRes => {
            return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
          });
      })
      .then(setResponse)
      .then(() => setRequest(false))
      .catch(console.error);
  } else {
    setErrors(profileValidator(profileCopy).errors);
  }
}

/**
 * @function setEndOfContenteditable --- By default, browsers move the cursor to the beginning when you are
 * using contentEditable.--- This function overides that.
 * Create a range (a range is a like the selection but invisible)
 * Select the entire contents of the element with the range
 * collapse the range to the end point. false means collapse to end rather than the start
 * get the selection object (allows you to change selection)
 * remove any selections already made
 * make the range you have just created the visible selection
 * @param {*} contentEditableElement:DOM element.
 *
 */
const setEndOfContenteditable = (contentEditableElement) => {
  let range;
  let selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(contentEditableElement);
    range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  else if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(contentEditableElement);
    range.collapse(false);
    range.select();
  }
}

/**
 * @function moveCursorRight --- calls setEndOfContenteditable on event.target
 *  @param {*} event
 */
const moveCursorRight = (e) => {
  const elem = e.target;
  elem.focus();
  setEndOfContenteditable(elem);
}
/**
 * @function validateBlob -- ensure that a blob exists, is not bigger than 5MB,
 * and its type is image.
 *  @param {*} blob
 * @returns errs:array
 */
const validateBlob = (blob) => {
  const errs = [];
  if (!blob) {
    errs.push({
      type: "image",
      message: "Please make sure you select the image correctly.",
    })
  } else {
    if (blob.size > 5242880) {
      errs.push({
        type: "image",
        message: "The image you are trying to upload is bigger than 5MB, please select another image or shrink its size.",
      })
    }
    if (blob.type.split('/')[0] !== 'image') {
      errs.push({
        type: "image",
        message: "The format of this file is not supported. Please try another image.",
      })
    }
  }

  return errs;
}


/**
 * @function uploadPhoto uploads a picture to a firebase bucket,
 * sets a value to a integer to signal how much has been uploaded.
 * @param {*}  profileCopy:object {email:string, firtName:string, lastName:string,  photoURL:string}
 * @param {*}  setProgress :function useState(requestStarted:boolean) 
 * @param {*} selectedFile :blob with the data from the photo
 * @param {*} setData :function useState(requestStarted:boolean) 
 */
const uploadPhoto = (profileCopy, setProgress, selectedFile, dispatch, setLoadingPhoto, setUnsavedChanges) => {
  const { firstName, lastName, _id } = profileCopy;
  const reference = `${_id}/profilePicture/${firstName}/${lastName}`;
  const ref = storage().ref(reference);
  return new Promise((resolve, reject) => {
    ref.put(selectedFile).on("state_changed", snapshot => {
      const progress = Math.ceil(((snapshot.bytesTransferred / snapshot.totalBytes)) * 100);
      setProgress(progress);
      if (progress === 100) return resolve();
    })
  })
    .then(() => storage().ref(reference))
    .then(refe => refe.getDownloadURL())
    .then(url => dispatch({ type: 'SET_PROFILE', payload: { ...profileCopy, photoURL: url } }))
    .then(() => setUnsavedChanges(true))
    .then(() => setLoadingPhoto(false))
    .catch(console.error)
}



export { profileValidator, saveChanges, fetchProfile, moveCursorRight, cancelAccount, uploadPhoto, validateBlob };
