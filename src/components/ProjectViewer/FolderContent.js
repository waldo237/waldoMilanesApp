
  import React from 'react'
import File from './File';
import Directory from './Directory';
  
  
  const FolderContent = ({ folder, opened, showModal, toggleClasses, insideAFolder }) => {

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
  export default FolderContent