/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ResponseAlert from '../ResponseAlert/ResponseAlert'
import Loading from '../Loading/Loading'
import ErrorCard from '../ErrorCard/ErrorCard'
import signUpValidator from './utilities/registerValidator'
import PasswordInput from './utilities/PasswordInput'
import envURL from '../../envURL';
import { Context } from '../../store/store'

const SignUpForm = () => {
  const [state] = useContext(Context);
  const { Trans } = state;
  const [user] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);

  const inputHandler = (event) => {
    const { name } = event.target;
    user[name] = event.target.value;
    setErrors(signUpValidator(user).errors.filter((e) => e.type === name));
  };
  const clearForm = () => {
    const allInput = document.querySelectorAll('#sign-up-form input');
    allInput.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.value = '';
    })
  }
  useEffect(() => {
    if (response && response.successful) clearForm();
  }, [response]);


  const signUp = (e) => {
    e.preventDefault();
    if (signUpValidator(user).valid) {
      setRequest(true);
      const sanitizedData = signUpValidator(user).sanitized;
      fetch(`${envURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sanitizedData),
      })
        .then((res) => res.json()
          .then(jsonRes => ({ successful: res.ok, message: jsonRes.message })))
        .then(setResponse)
        .then(() => setRequest(false))
        .catch(console.error);
      // setErrors([]) // empty displayble arrays
    } else {
      setErrors(signUpValidator(user).errors);
    }
  }

  return (
    <form id='sign-up-form' className="sign-form" onSubmit={signUp}>
      <h3>
        <Trans i18nKey='signUp.title'>Sign Up</Trans>
      </h3>
      {response
        ? (<ResponseAlert response={response} setResponse={setResponse} />)
        : (<div>{requestStarted ? <Loading message="Processing your registration" /> : null}{" "} </div>)}
      {(displayableErrors) ? <ErrorCard errors={displayableErrors} suggestions={signUpValidator(user).suggestions} setErrors={setErrors} /> : null}
      <div className="form-group">
        <label className="input" htmlFor="follower-sign-up-first-name">
          <Trans i18nKey='signUp.fistName'>First name</Trans> 
          <input
            id="follower-sign-up-first-name"
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={inputHandler}
          />
        </label>

      </div>

      <div className="form-group">
        <label className="input" htmlFor="follower-sign-up-last-name">
          <Trans i18nKey='signUp.lastName'>Last name</Trans> 
          <input
            id="follower-sign-up-last-name"
            name="lastName"
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={inputHandler}
          />
        </label>

      </div>

      <div className="form-group">
        <label className="input" htmlFor="follower-sign-up-email">
          
          <Trans i18nKey='signUp.emailA'>Email address</Trans> 
          <input
            id="follower-sign-up-email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={inputHandler}
          />
        </label>

      </div>

      <PasswordInput id='sign-up' inputHandler={inputHandler} strength={signUpValidator(user).passwordStrength} />
      <button disabled={requestStarted} type="submit" className="submit-btn primary">
        {(requestStarted)
          ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
          : <Trans i18nKey='signUp.btnSignUp'>Sign Up</Trans>}

      </button>
      <p className="alredy-registered-question text-right">
        <Trans i18nKey='signUp.already'>Already registered?</Trans>  {" "}
        <a href="#two-panel"><Trans i18nKey='signUp.signOn'>sign on</Trans></a>
      </p>
    </form>

  )
}

export default SignUpForm