import React, {  useContext, useEffect } from 'react';
import './Dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../store/store';
import i18n from '../../i18n';


const Settings = () => {
  const [state, dispatch] = useContext(Context);
  const {Trans} = state;
  const languages = [
    { value: "en", label: "EN" },
    { value: "es", label: "ES" },
    { value: "fr", label: "FR", default:true }
  ];
  useEffect(() => {
    if (state.darkTheme) {
      if (typeof window !== `undefined`) {
      const darkThemeSwich = document.getElementById('dark-theme');
      darkThemeSwich.setAttribute('checked', state.darkTheme);
      }
    }
  }, [state.darkTheme])
  const inputHandler = (event) => {
    if (typeof window !== `undefined`) {
    localStorage.setItem('darkTheme', event.target.checked);
    }
    dispatch({ type: 'DARK_THEME', payload: event.target.checked });
  };
  const handleChange = (e) => {
    const {value} = e.target;
    if (typeof window !== `undefined`) {
    localStorage.setItem('language',value);
    }
    dispatch({type: 'CHANGE_LANGUAGE', value});
    i18n.changeLanguage(value);
  };
  return (
    <>
      <div id='settings-container' className='dash-wrapper'>
        <div className='settings light fade'>
          <div className='dash-title-wrapper bold flex-row'>

            <div id='title-img' />
            <div className='dash-title'><Trans i18nKey="settings.title">Settings</Trans></div>

          </div>
          <div className='dashboard-content'>

            <div className='dash-action flex-row-justified-aligned-c dash-animation'>
              <div className=" dash-icon">
                <FontAwesomeIcon
                  icon={faMoon}
                />
              </div>
              <h1 className='dash-action-text primary--text Lato'><Trans i18nKey="settings.theme">Dark mode</Trans> &nbsp;</h1>
              <div className="toggleWrapper">
                <label htmlFor="dark-theme" className="form-switch">
                  <input onClick={inputHandler} type="checkbox" name="dark-theme" className="mobileToggle" id="dark-theme" />
                  <i />
                </label>
              </div>
            </div>

            <div className='dash-action flex-row-justified-aligned-c dash-animation'>
              <div className=" dash-icon">
                <FontAwesomeIcon
                  icon={faLanguage}
                />
              </div>
              <h1 className='dash-action-text primary--text Lato'><Trans i18nKey="settings.language">Languages</Trans> &nbsp;</h1>
              <div style={{ width: '100px' }}>
                <select
                  id="selectbox"
                  defaultValue={state.language}
                  className=""
                  onChange={handleChange}
                >
                  {languages.map((lang) =>  (
                    <option
                      className=""
                      key={lang.label}
                      value={lang.value}
                      
                    >
                      {lang.label}
                    </option>
)
                 )}
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Settings