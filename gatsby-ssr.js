import React from "react";

import Store from './src/store/store'
import './i18n';

// eslint-disable-next-line react/prop-types
 const wrapRootElement = ({ element }) => {
  return ( 
    <React.StrictMode>
      <Store>
        { element }
      </Store>
    </React.StrictMode>
 
  )
}


  // const shouldUpdateScroll = ({
  //   routerProps: { location },
  //   getSavedScrollPosition
  // }) => {
  
  //   if (location.hash) {
  //     return false;
  //   }
  
  //   return true;
  // };
  
export { wrapRootElement }