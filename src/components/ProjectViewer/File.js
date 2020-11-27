import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import CodeModal from "./CodeModal";
import IconizeFile from "./IconizeFile";

export default function File({ file, showModal, insideAFolder }) {
  return (
    <div className={(insideAFolder)?`insideAFolder file`: `file`}>
      <button
        type="button"
        onClick={() => showModal(file._id)}
        className="file-button"
      >

        <IconizeFile name={file.name} small />
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
