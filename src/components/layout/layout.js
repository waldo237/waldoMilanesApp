/* eslint-disable no-shadow */
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next'
import React, { useContext, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import favicon from '../../static/banner.png'
import "./layout.scss";
import "./index.scss";
import Navigation from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { Context } from "../../store/store";
import { confirmLoggedIn, getIdFromLocalToken } from "../Supporters/utilities/authorizationFunctions";
import { fetchProfile } from "../Dashboard/profileFunctions";

const Layout = ({children}) => {
  const [state, dispatch] =useContext(Context);
  useEffect(()=>{
    new Promise((resolve, reject)=>{
    const confirmation = confirmLoggedIn();
    if(confirmation) return resolve(confirmation)
    return reject(new Error('The user is not logged in'));
  })
  .then( (confirmation)=> dispatch({type:'SET_USER_IS_LOGGED_IN', payload: confirmation}))
  .then(()=>{ const {_id} =  getIdFromLocalToken(); return _id})
  .then((_id)=>fetchProfile(`/user/profile/${_id}`, dispatch))  
  .catch((err)=>console.log(err.message));
  },[state.isLoggedIn, dispatch]);

  useEffect(()=>{
    if (typeof window !== `undefined`) {
    const darkTheme = localStorage.getItem('darkTheme')  === 'true';
    dispatch({ type: 'DARK_THEME', payload: darkTheme });
    }
  },[state.darkTheme, dispatch])

  const {t}=  useTranslation(); // INITIALIZE T FUNCTION
  useEffect(()=>{
   let savedLang = ""
   if (typeof window !== `undefined`) {
    savedLang = localStorage.getItem('language');
   }
    dispatch({type: 'CHANGE_LANGUAGE', payload: savedLang});
    dispatch({type: 'SET_T', payload: t});

  },[state.language, dispatch, t])
  
  return (
    <HelmetProvider>
      <div className={(state.darkTheme)?'app dark': 'app light'}>
        <Helmet>
          <link rel="icon" href={favicon} />
        </Helmet>
        <header className="header primary " id="header">
          <Navigation />
        </header>
        {children}
        <Footer className='footer' />
      </div>
    </HelmetProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout;
