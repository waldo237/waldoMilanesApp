import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import CodeModal from "./CodeModal";
import File from "./File";

const Directory = ({folder, toggleClasses, showModal})=> {
  return (
    <div className="folder-container">
      
      <button
        type="button"
        onClick={() => toggleClasses(folder._id)}
        className="file-button"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`${folder._id} primary--text icon-to-turn`}
        />{" "}
        <FontAwesomeIcon
          icon={faFolder}
          className="secondary--text"
        />{" "}
        {folder.name}
      </button>

      {folder.content.map((childFile) => (

        <div
          key={`new ${childFile._id}`}
          className={`${folder._id} file internal-files folder-closed`}
        >
          {(childFile.type === "file")
          ? <File showModal={showModal} file={childFile} />
          : <Directory folder={childFile} showModal={showModal} toggleClasses={toggleClasses} />}
        </div>

)
)}
    </div>
);
}

export default Directory;