import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import FolderContent from "./FolderContent";

const Directory = ({ folder, toggleClasses, showModal, insideAFolder }) => {
  const [opened, setOpen] = useState(false);

  const folderBtnsClicked = (id) => {
    return new Promise((resolve, reject) => {
      const folderContainers = document.querySelectorAll('.folder-container');
      folderContainers.forEach((container) => {
        if (container.classList.contains(id)) {
          setOpen(true)
          return resolve(id)
        }
      })
    })

  }


  return (
    <div className={(insideAFolder) ? `insideAFolder folder-container ${folder._id}` : `folder-container ${folder._id}`}>

      <button
        type="button"
        onClick={() => { folderBtnsClicked(folder._id).then(toggleClasses); }}
        className="file-button"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`${folder._id} primary--text icon-to-turn`}
        />{" "}
        <FontAwesomeIcon
          icon={faFolder}
          className="folder-color"
        />{" "}
        {folder.name}
      </button>

      <FolderContent opened={opened} folder={folder} showModal={showModal} toggleClasses={toggleClasses} insideAFolder />

    </div>
  );
}

export default Directory;