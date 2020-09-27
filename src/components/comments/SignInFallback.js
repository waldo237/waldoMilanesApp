import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Context } from '../../store/store'

function SignInFallback() {
 const [state]= useContext(Context);
 const {Trans}= state;
    return (
      <div className="fallback-container fadeInUpx">
        <h3 className="fallback-title">
          <Trans i18nKey='fallback.please'>Please sign in to do this action</Trans>
        </h3>
        <div className="fallback-btn-container">
          <Link to="/followers#two-panel">
            <button type="button" className="fallback-signIn-btn">
              <Trans i18nKey='fallback.sign'>Sign In</Trans>
            </button>
          </Link>
          <Link to="/followers#one-panel">
            <button type="button" className="fallback-signUp-btn">
              <Trans i18nKey='fallback.create'>Create an account</Trans>
            </button>
          </Link>
        </div>
      </div>
    )
}

export default SignInFallback
