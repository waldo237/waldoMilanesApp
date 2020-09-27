/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/store';
import ErrorCard from '../components/ErrorCard/ErrorCard';
import Loading from '../components/Loading/Loading';
import ResponseAlert from '../components/ResponseAlert/ResponseAlert';
import { emailValidator } from '../components/Supporters/utilities/signInValidator';
import envURL from '../envURL';

const PasswordResetInit = () =>{
    const [state] = useContext(Context);
    const { Trans } = state;
    const [response, setResponse] = useState(null);
    const [requestStarted, setRequest] = useState(false);
    const [displayableErrors, setErrors] = useState([]);
    const [user] = useState({});
    
    useEffect(() => {
      document.title = "Password reset";
    }, []);
    
    const inputHandler = (event) => {
      const { name } = event.target;
      user[name] = event.target.value;
      const {errors}= emailValidator(user);
      setErrors(errors);
    };
  
  const sendPasswordReset =()=>{
    const {errors}= emailValidator(user);
    if(errors.length){
      setErrors(errors);
    }else{
      setRequest(true);
      fetch(`${envURL}/auth/sendPasswordResetToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
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
          
          <section className="password-reset-card">
            <header className="followers-title">
              <h1><Trans i18nKey='passwordReset.title'>Forgot my password</Trans>  </h1>
              <h4>
                <Trans i18nKey='passwordReset.subtitle'>Enter your email address
                </Trans>
              </h4>
            </header>
            <form className="sign-form" onSubmit={(e) => { e.preventDefault();  sendPasswordReset() }}>
              {response
          ? (<ResponseAlert response={response} setResponse={setResponse} />)
          : (<div>{requestStarted ? <Loading message="Sending request" /> : null}{" "} </div>)}
              {(displayableErrors) ? <ErrorCard errors={displayableErrors} setErrors={setErrors} /> : null}
              <div className="form-group">
                <label className="input" htmlFor="password-reset-email"><Trans i18nKey='signInForm.emailA'>Email address</Trans> 
                  <input
                    id="password-reset-email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={inputHandler}
                  />
                </label>
              </div>
              <button disabled={requestStarted} type="submit" className="submit-btn primary">
                {(requestStarted)
           ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
            : <Trans i18nKey='passwordReset.btn'>Reset password</Trans>} 
       
              </button>
            </form>
          </section>
        </div>
      </>
    )
}

export default PasswordResetInit;