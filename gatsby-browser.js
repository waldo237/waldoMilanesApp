import React, { Suspense } from "react";

import Layout from "./src/components/layout/layout";
import Store from './src/store/store'
import './src/i18n';
import Loading from "./src/components/Loading/Loading";

// eslint-disable-next-line react/prop-types
 const wrapRootElement = ({ element }) => {
  return ( 
    <React.StrictMode>
      <Store>
        <Suspense fallback={<Loading message="Loading app" />}>
          <Layout>{element}</Layout>

        </Suspense>
      </Store>
    </React.StrictMode>
 
  )
}


const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {

  if (location.hash) {
    return false;
  }

  return true;
};

 const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

 const registerServiceWorker = () => true


export {wrapRootElement, shouldUpdateScroll, onServiceWorkerUpdateReady, registerServiceWorker}