import React, {useRef, useEffect} from 'react';
import './Dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faNewspaper, faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../Avatar/Avatar';

const Dashboard = ()=>{

const actions = [
    {title:'Special projects', icon:faProjectDiagram, link:''},
    {title:'Special Articles', icon:faNewspaper, link:''},
    {title:'Notifications', icon:faBell, link:''},
    {title:'Settings', icon: faCog, link:''},
    {title:'Sign out', icon: faSignOutAlt, link:''},
]
    return (
      <>
        <div id='settings-container' className='dash-wrapper'>
          <div className='dashboard light'>
            <div className='dash-title-wrapper bold flex-row '>
   
              <div id='title-img' /> 
              <div className='dash-title'> Dashboard</div> 

            </div>
            <div className='dashboard-content'>

         
              <div className='dash-user-info flex-row dash-animation'>
                <Avatar user={{photoURL:'https://lh3.googleusercontent.com/ogw/ADGmqu93dmNB10G5iAvsETm2tDsVefUNE3oDWzGW0Iav=s83-c-mo', firstName:'Jose', LastName: 'Taveras', email:'ajo@.fo.com'}} size={65} />
                <div className='flex-column'>
                  <h1 className='dash-user-info-name primary--text Lato'>Waldo Milanes</h1>
                  <p className='dash-user-info-profile Lato'>profile</p>
                </div>
              </div>

              { actions.map((action)=> (
                <div className='dash-action flex-row-justified-aligned-c dash-animation' key={action.title}>
                  <div className=" dash-icon">
                    <FontAwesomeIcon icon={action.icon} />
                  </div>
                  <h1 className='dash-action-text primary--text Lato'>{action.title}</h1>
                </div>
      )
        )  }
            </div>
          </div>
        </div>
      </>
    )
}

export default Dashboard