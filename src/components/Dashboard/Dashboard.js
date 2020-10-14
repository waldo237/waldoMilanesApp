import React, {useContext} from 'react';
import './Dashboard.scss'; 
import { navigate } from "gatsby"  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faNewspaper, faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Propstype from 'prop-types';
import Avatar from '../Avatar/Avatar'; 
import {Context}  from '../../store/store';
import { logOut, getIdFromLocalToken} from '../Supporters/utilities/authorizationFunctions'
import { uuidv4 } from '../gobalUtil';
 
const Dashboard = ({ removeDisplayNone }) => {
  const [state, dispatch] = useContext(Context)
  const { Trans } = state; 

  
  const sendToProfile = async () => {
    const {_id} = getIdFromLocalToken();
    
    navigate(`/user/profile/${_id}/`);
  }
  const actions = [
    { key: uuidv4(), title:  <Trans i18nKey='dashboard.sP'>Special projects</Trans>, icon: faProjectDiagram, link: '' },
    {  key: uuidv4(),title: <Trans i18nKey='dashboard.sA'>Special Articles</Trans>, icon: faNewspaper, link: '' },
    {  key: uuidv4(),title:  <Trans i18nKey='dashboard.notification'>Notifications</Trans>, icon: faBell, link: '' },
    {  key: uuidv4(),title:  <Trans i18nKey='dashboard.settings'>Settings</Trans>, icon: faCog, link: '', id: 'setting-btn', func: ()=> removeDisplayNone('settings-container') },
    {  key: uuidv4(),title:  <Trans i18nKey='dashboard.SignOut'>Sign out</Trans>, icon: faSignOutAlt, link: '', func: ()=> logOut(navigate, dispatch) },
  ]
  return (
    <>
      <div id='dashboard-dialog' className='dash-wrapper'>
        <div className='dashboard light fade'>
          <div className='dash-title-wrapper bold flex-row '>

            <div id='title-img' />
            <div className='dash-title'>
              <Trans i18nKey='dashboard.dash'>Dashboard</Trans> 
            </div>

          </div>
          <div className='dashboard-content'>


            <div className='dash-user-info flex-row'>
              <Avatar user={state.profile} size={65} />
              <div className='flex-column'>
                <h1 className='dash-user-info-name primary--text'>{state.profile.firstName}{" "} {state.profile.lastName}</h1>
                <button type='button' onClick={sendToProfile} className='dash-user-info-profile'>
                  <Trans i18nKey='dashboard.profile'>profile</Trans> 
                </button>
              </div>
            </div>

            {actions.map((action) => (
              <div
                id={action.id}
                onClick={() => { if (action.func) action.func() }}
                onKeyDown={() => { if (action.func) action.func() }}
                className='dash-action flex-row-justified-aligned-c dash-animation'
                key={action.key}
              >
                <div className=" dash-icon">
                  <FontAwesomeIcon icon={action.icon} />
                </div>
                <h1 className='dash-action-text primary--text Lato'>{action.title}</h1>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  removeDisplayNone: Propstype.func.isRequired,
}
export default Dashboard

