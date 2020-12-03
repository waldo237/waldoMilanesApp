import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import CodeModal from "./CodeModal";
import File from "./File";

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



  const FolderContent = ({ folder }) => {

    if (opened) {
      return (
        <>  {
          folder.content.map((childFile) => (
            <div
              key={`${childFile._id}`}
              className={`${folder._id} file internal-files folder-closed`}
            >
              {(childFile.type === "file")
                ? <File showModal={showModal} file={childFile} insideAFolder />
                : <Directory folder={childFile} showModal={showModal} toggleClasses={toggleClasses} insideAFolder />}
            </div>
          )
          )
        }
        </>
      )
    }
    return null;
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

      <FolderContent folder={folder} />


    </div>
  );
}

export default Directory;