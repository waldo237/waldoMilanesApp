import React, { createContext, useReducer } from "react";
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import Reducer from './Reducer'

let initialLang = ''
if (typeof window !== `undefined`) {
   initialLang = localStorage.getItem('language');
}
const initialState = {
    articles: [],
    selectedArticle: {},
    isLoggedIn:false,
    profile: {}, 
    error: null, 
    darkTheme: false,
    language: (initialLang) || 'EN',
    Trans,
    
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
    )
};
Store.propTypes= {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}
export const Context = createContext(initialState);
export default Store;
