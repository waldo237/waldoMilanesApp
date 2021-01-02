/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import React, { useContext } from "react";
import "./followers.scss";
import SignInForm from "../components/Supporters/SignInForm";
import SignUpForm from "../components/Supporters/signUpForm";
import { Context } from "../store/store";
import SEO from "../components/seo";

const Followers = ({location}) => {
  const [state] = useContext(Context);
  const { Trans } = state;
  const FollowersTitleIcon = () => {
    return (
      <>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enableBackground="new 0 0 512 512" height="64" viewBox="0 0 512 512" width="64"><path d="m256 512c-5.61 0-10.755-3.111-13.362-8.077l-56.578-107.804h-105.117c-44.632 0-80.943-39.266-80.943-87.532v-221.055c0-48.265 36.311-87.532 80.943-87.532h350.115c44.631 0 80.942 39.267 80.942 87.532v221.055c0 48.265-36.311 87.532-80.943 87.532h-105.117l-56.578 107.804c-2.607 4.966-7.752 8.077-13.362 8.077z" fill="#186fa2" /><path d="m431.057 0h-175.057v512c5.61 0 10.755-3.111 13.362-8.077l56.578-107.804h105.118c44.632 0 80.943-39.267 80.943-87.532v-221.055c-.001-48.265-36.312-87.532-80.944-87.532z" fill="#063651" /><path d="m368.316 157.224-5.792 3.595c-1.797 1.198-3.595 1.598-4.993 1.598-5.792 0-9.787-6.191-9.787-12.382 0-4.194 1.798-8.188 5.792-10.584l26.363-15.976c1.598-.999 3.596-1.398 5.792-1.398 6.391 0 13.78 3.794 13.78 9.786v127.012c0 6.39-7.789 9.586-15.578 9.586-7.788 0-15.578-3.195-15.578-9.586v-101.651z" fill="#dbe2eb" /><path d="m236.257 166.841c10.372-10.392 16.795-24.726 16.795-40.532 0-31.654-25.755-57.407-57.411-57.407s-57.411 25.753-57.411 57.407c0 15.807 6.423 30.141 16.795 40.532-35.092 14.717-59.804 49.422-59.804 89.792 0 14.976 12.185 27.159 27.162 27.159h146.516c14.977 0 27.162-12.184 27.162-27.16 0-40.369-24.713-75.074-59.804-89.791z" fill="#fddb8d" /><path d="m256 178.01v105.783h12.899c14.977 0 27.162-12.184 27.162-27.16 0-32.271-15.8-60.909-40.061-78.623z" fill="#fbac5b" /></svg>       
        </div>
      </>
    );
  };

  return (
    <>
      <SEO 
        title="Become one of follower | fan | Supporter" 
        description="If you like what I do; my writing, tutorials, opinions, and projects, you can register to https://waldomilanes.com/followers to be able to access all my content and receive notifications when I publish new material."
      />
      <div className="followers-container fadeInUpx light">
        <header className="followers-title">
          <div className='page-default-title-icon'>
            <FollowersTitleIcon />
          </div>
          <div>
            <h1><Trans i18nKey='followers.followers'>Followers</Trans>  </h1>
            <h4>
              <Trans i18nKey='followers.subtitle'> If you like what I do, you can register to
                access all my content and receive notifications when I publish new material.
              </Trans>
             
            </h4>
          </div>
        </header>
        <section className="followers-card">
          <input
            className="radio"
            id="two"
            name="group"
            type="radio"
            checked
            readOnly
          />
          <input
            className="radio"
            id="one"
            name="group"
            type="radio"
            checked={location.hash !== "#one-panel"}
            readOnly
          />
          <div className="tabs ">
            <label
              className="tab  neom hover-underline-yellow"
              id="two-tab"
              htmlFor="two"
            >
              <Trans i18nKey='followers.tabSignUp'> Sign Up</Trans>
            </label>
            <label
              className="tab neom hover-underline-yellow"
              id="one-tab"
              htmlFor="one"
            >
              <Trans i18nKey='followers.tabSignOn'> Sign On</Trans>
            </label>
          </div>
          <div className="panels">
            <div className="panel" id="one-panel">
              <article className="followers-login-card ">
                <SignInForm />
              </article>
            </div>
            <div className="panel" id="two-panel">
              <article className="followers-login-card ">
                <SignUpForm />
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

Followers.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string
  })
}

export default Followers;
