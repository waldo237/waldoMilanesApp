import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import {
  faNodeJs,
  faJs,
  faCss3,
  faHtml5,
  faJava,
  faVuejs,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";

const IconizeFile = ({ name, usingExtension, small }) => {
 const iconClass = small ? "": "fa-2x";
  const fileNameExtension =(usingExtension)? name:name.split(".")[1];
  let icon = null;
  switch (fileNameExtension) {
    case "js":
      icon = <FontAwesomeIcon className={iconClass} icon={faJs} />;
      break;
    case "java":
      icon = <FontAwesomeIcon className={iconClass} icon={faJava} />;
      break;
    case "css":
      icon = <FontAwesomeIcon className={iconClass} icon={faCss3} />;
      break;
    case "html":
      icon = <FontAwesomeIcon className={iconClass} icon={faHtml5} />;
      break;
    case "vue":
      icon = <FontAwesomeIcon className={iconClass} icon={faVuejs} />;
      break;
    case "node":
      icon = <FontAwesomeIcon className={iconClass} icon={faNodeJs} />;
      break;
    case "react":
      icon = <FontAwesomeIcon className={iconClass} icon={faReact} />;
      break;
    case "scss":
      icon = <FontAwesomeIcon className={iconClass} icon={faSass} />;
      break;
    default:
      icon = <FontAwesomeIcon className={iconClass} icon={faCode} />;
      break;
  }
  return icon;
};

export default IconizeFile;
