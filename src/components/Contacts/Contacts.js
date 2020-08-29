import React, { useState, useEffect } from "react";
import "./Contacts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faPhone,
  faEnvelope,
  faMapMarker,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import contactValidator from "./contactValidator";
import ErrorCard from "../ErrorCard/ErrorCard";
import ResponseAlert from "../ResponseAlert/ResponseAlert";
import Loading from "../Loading/Loading";
import envURL from '../../envURL';

const Contacts = () => {
  const [user] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);

  useEffect(() => {
    document.title = "Get in touch with me";
  }, []);
  const inputHandler = (event) => {
    const { name } = event.target;
    user[name] = event.target.value;
    setErrors(contactValidator(user).errors.filter((e) => e.type === name));
  };
  const postEmail = (e) => {
    e.preventDefault();
    if (contactValidator(user).valid) {
      setRequest(true);

      const sanitizedData = contactValidator(user).sanitized;

      fetch(`${envURL}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sanitizedData),
      })
        .then((res) => res.json()
          .then(jsonRes => ({ successful: res.ok, message: jsonRes.message })))
        .then(setResponse)
        .then(()=>setRequest(false))
        .catch(console.error);
    } else {
      setErrors(contactValidator(user).errors);
    }
  };
  const ContactTitleIcon = () => {
    return (
      <>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 0 64 64" width="70"><path d="m61 27-10 10h-3v-23z" fill="#ee8700" /><path d="m48 7v30h-32v-30a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4z" fill="#5aaae7" /><path d="m32.12 27.12a2 2 0 0 0 2.83 0l.71-.7 2.83 2.83-.71.7a5.01 5.01 0 0 1 -7.07 0l-5.66-5.66a5 5 0 0 1 0-7.07l.71-.7 2.83 2.83-.71.7a2 2 0 0 0 0 2.83z" fill="#e6e7e8" /><g fill="#ff9811"><path d="m36.36 22.88 5.66 5.66-1.41 1.41a1.008 1.008 0 0 1 -1.42 0l-.7-.7-2.83-2.83-.71-.71a1.008 1.008 0 0 1 0-1.42z" /><path d="m26.46 12.98 5.66 5.66-1.41 1.41a1.008 1.008 0 0 1 -1.42 0l-.7-.7-2.83-2.83-.71-.71a1.008 1.008 0 0 1 0-1.42z" /><path d="m38 3v2a2.006 2.006 0 0 1 -2 2h-8a2.006 2.006 0 0 1 -2-2v-2z" /></g><path d="m16 14v23h-3l-10-10z" fill="#ee8700" /><path d="m61 27v32a2.006 2.006 0 0 1 -2 2h-54a2.006 2.006 0 0 1 -2-2v-32l10 10h38z" fill="#ffa733" /><path d="m50 16v21h-2v-23z" fill="#cc7400" /></svg>
        </div>
      </>
    );
  };
  return (
    <main className="contact-container fadeInUpx light">
      <header className="contact-title">
        <div className='page-default-title-icon'>
          <ContactTitleIcon />
        </div>
        <div>
          <h1 className="primary--text">
            Interested?
          </h1>
          <h4>
            Let&apos;s get in contact
          </h4>
        </div>
      </header>

      <section className=" contact-card">
        <div className="contact-info-card">
          <h1 className="waldo-milanes">Waldo Milanes</h1>
          <div className="contact-info">
            <a
              href="https://goo.gl/maps/kqbnLG1M8YErout38"
              target="_blank"
              className="anchor"
              rel="noopener noreferrer"
            >
              <p>
                {" "}
                <FontAwesomeIcon
                  className="contact-card-icon"
                  icon={faMapMarker}
                />{" "}
                c/12 #44 Ensanche Mella 2, Santiago, Dom. Rep.
              </p>
            </a>
            <a
              href="tel:(809) 742-6432"
              target="_blank"
              className="anchor"
              rel="noopener noreferrer"
            >
              <p>
                {" "}
                <FontAwesomeIcon
                  className="contact-card-icon"
                  icon={faPhone}
                />{" "}
                (809) 742-6432{" "}
              </p>
            </a>
            <a
              href="mailto:contact@waldomilanes.com"
              target="_blank"
              className="anchor"
              rel="noopener noreferrer"
            >
              <p>
                {" "}
                <FontAwesomeIcon
                  className="contact-card-icon"
                  icon={faEnvelope}
                />{" "}
                contact@waldomilanes.com
              </p>
            </a>
          </div>
        </div>
        
        <form className="contact-me-form" onSubmit={postEmail}>
          <div className='response-area'>
            {response ? (
              <ResponseAlert response={response} setResponse={setResponse} />
            ) : (
              <div>
                {requestStarted ? <Loading message="Processing your email" /> : null}{" "}
              </div>
              )}
            {(displayableErrors)? <ErrorCard errors={displayableErrors} setErrors={setErrors} />:null}
          </div>
          <div>
            <h2 className="primary--text">
              Email me {" "}
              <FontAwesomeIcon
                className="contact-card-icon"
                icon={faPaperPlane}
              />
            </h2>
          </div>

          <div className="form-group">
            <label className="input" htmlFor="emailer-name">
              Name
              <input
                id="emailer-name"
                type="text"
                className="form-control"
                minLength="3"
                placeholder="Name"
                name="name"
                onChange={inputHandler}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="input" htmlFor="emailer-email">
              E-mail
              <input
                id="emailer-email"
                type="email"
                className="form-control"
                placeholder="email"
                name="email"
                onChange={inputHandler}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="input" htmlFor="email-message">
              Message
              <textarea
                id="email-message"
                type="text"
                className="form-control"
                placeholder="email"
                minLength="15"
                rows="4"
                cols="50"
                name="message"
                onChange={inputHandler}
              />
            </label>
          </div>
          <button type="submit" className="contact-submit-btn">
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contacts;
