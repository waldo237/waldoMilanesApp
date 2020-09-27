
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { Context } from "../../store/store";

const PrivateRoute = ({ children}) => {
    const [state] = useContext(Context);
    
    useEffect(() => {

      if (!state.isLoggedIn && location.pathname !== `/followers`) {
        navigate("/followers")
      }
   
    }, [state.isLoggedIn, location])


  return (
    (state.isLoggedIn)
    ?(
      <div>
        {children}
      </div>
)
    :null
)
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
  location: PropTypes.shape({
    pathname: PropTypes.any
  })
}


export default PrivateRoute