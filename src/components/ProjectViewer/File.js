import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import CodeModal from "./CodeModal";

export default function File({ file, showModal }) {
  return (
    <div className="file">
      <button
        type="button"
        onClick={() => showModal(file._id)}
        className="file-button"
      >
        <FontAwesomeIcon
          icon={faFile}
          className="primary--text"
        />{" "}
        {file.name}
      </button>
      <CodeModal
        showModal={showModal}
        code={file.content}
        fileId={file._id}
        name={file.name}
      />
    </div>
  );
}
