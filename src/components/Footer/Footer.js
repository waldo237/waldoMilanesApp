import React, { useContext } from "react";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faFacebookSquare,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "gatsby";
import { Context } from "../../store/store";

const Footer = () => {

  const [state]=useContext(Context);
  const {Trans} = state;
 return ( 
   <footer className="primary footer">
     <div>
       <a
         rel="noopener noreferrer"
         href='https://twitter.com/WaldoMilanes'
         target="_blank"
         className="link hoverable-card social-link"
       >
         <FontAwesomeIcon className="fa-2x social" icon={faTwitter} />

       </a>
       <a
         rel="noopener noreferrer"
         href='https://www.linkedin.com/in/waldomilanes/'
         target="_blank"
         className="link hoverable-card social-link"
       >
         <FontAwesomeIcon className="fa-2x social" icon={faLinkedin} />
       </a>
       <a
         rel="noopener noreferrer"
         href='https://www.facebook.com/milanes237/'
         target="_blank"
         className="link hoverable-card social-link"
       >
         <FontAwesomeIcon className="fa-2x social" icon={faFacebookSquare} />
       </a>
       <a
         rel="noopener noreferrer"
         href='https://www.instagram.com/waldo237/?hl=en'
         target="_blank"
         className="link hoverable-card social-link"
       >
         <FontAwesomeIcon className="fa-2x social" icon={faInstagram} />
       </a>
       <a
         rel="noopener noreferrer"
         href='https://github.com/waldo237'
         target="_blank"
         className="link hoverable-card social-link"
       >
         <FontAwesomeIcon className="fa-2x social" icon={faGithub} />
       </a>
     </div>
     <div className="footer-credits flex-row-wrap">
       {" "}
       <span>
         &#9400; 2019-
         {new Date().getFullYear()} &nbsp;{" "}
       </span>{" "}
       <Link to="/" className="social-link link">
         <span> | W PROGRAMMING | </span> <span>&nbsp;waldomilanes.com </span>
       </Link>
     </div>

     <div>
       <Trans i18nKey='footer.dev'>developed by Waldo Milanes</Trans> 
       <span>&reg;</span>
     </div>
   </footer>
);
}

export default Footer;
