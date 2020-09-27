/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types'
import { Link } from 'gatsby';
import { Context } from '../store/store';
import ErrorCard from '../components/ErrorCard/ErrorCard';
import Loading from '../components/Loading/Loading';
import ResponseAlert from '../components/ResponseAlert/ResponseAlert';
import PasswordInput from '../components/Supporters/utilities/PasswordInput';
import { resetPasswordValidator } from '../components/Supporters/utilities/signInValidator';
import envURL from '../envURL';
import SEO from '../components/seo';

const EnterNewPassword = ({location}) =>{
    const [state] = useContext(Context);
    const { Trans } = state;
    const [response, setResponse] = useState(null);
    const [requestStarted, setRequest] = useState(false);
    const [displayableErrors, setErrors] = useState([]);
    const [user] = useState({});
    const [passStrength, setStrength] = useState(0);

    const inputHandler = (event) => {
      const { name } = event.target;
      user[name] = event.target.value;
     const {errors, passwordStrength}= resetPasswordValidator(user);
     setStrength(passwordStrength);
     setErrors(errors.filter((e) => e.type === name));
    };

    useEffect(() => {
      setResponse({message: 'Connecting to server...'})
      const token = location.search.split('?')[1];
      fetch(`${envURL}/auth/confirmPasswordResetToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({token})
      })
      .then(async (res) => {
        const jsonRes = await res.json();
        return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
      })
        .then(setResponse)
        .catch(console.error);
    }, []);

  const options =  {setRequest, setErrors, setResponse};
  const sendNewPassword =()=>{
    const {errors, passwordStrength, sanitized}= resetPasswordValidator(user);
    setStrength(passwordStrength);
    if(errors.length){
      setErrors(errors);
    }else{
      const {password} = (sanitized);
      setRequest(true);
      const token = location.search.split('?')[1];
    
      fetch(`${envURL}/auth/enterNewPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({token, password})
      })
        .then(async (res) => {
          const jsonRes = await res.json();
          return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
        })
        .then(setResponse)
        .then(() => setRequest(false))
        .catch(console.error);
    }
  }
    return (
      <>

        <div className="followers-container fadeInUpx light">
          { (response && !response.successful)
      ? (
        <section className="password-reset-card fallback">{response.message} 
          {(response.link)
          ?(
            <Link to={response.link.href}>
              <button type="button" className="reset-btn primary">
                <Trans i18nKey='enterNewPass.sendAgain'>{response.link.label}</Trans>
              </button>
            </Link>
)
          :null}
        </section>
)
     :(
       <section className="password-reset-card">
         <header className="followers-title">
           <h1><Trans i18nKey='enterNewPass.title'>Reset your password</Trans>  </h1>
           <h4>
             <Trans i18nKey='enterNewPass.subtitle'> 
               Please enter and confirm your new password bellow
             </Trans>
           </h4>
         </header>
         <form className="sign-form" onSubmit={(e) => { e.preventDefault();  sendNewPassword(options) }}>
           {response
          ? (<ResponseAlert response={response} setResponse={setResponse} />)
          : (<div>{requestStarted ? <Loading message="Sending request" /> : null}{" "} </div>)}
           {(displayableErrors) ? <ErrorCard errors={displayableErrors} suggestions={resetPasswordValidator(user).suggestions} setErrors={setErrors} /> : null}
           <div className="form-group">
             <PasswordInput id='enter-new-password' inputHandler={inputHandler} strength={passStrength} />
             <PasswordInput id='reenter-new-password' inputHandler={inputHandler} strength={-1} reEnter />
           </div>
           <button disabled={requestStarted} type="submit" className="submit-btn primary">
             {(requestStarted)
           ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
            : <Trans i18nKey='enterNewPass.btn'>Send new password</Trans>} 
       
           </button>
         </form>
       </section>
)}
     
        </div>
      </>
    )
}
EnterNewPassword.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: Proptypes.object,
  }
export default EnterNewPassword;