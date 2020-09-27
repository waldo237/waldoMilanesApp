import React, { useEffect, useState, useContext } from "react";
import "./projectViewer.scss";
import Proptypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faChevronRight,
  faLink,
  faCalendarCheck,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import IconizeFile from "../components/ProjectViewer/IconizeFile";
import CodeModal from "../components/ProjectViewer/CodeModal";
import Loading from "../components/Loading/Loading";
import envURL from '../envURL';
import ScreenshotViewer from "../components/ProjectViewer/ScreenshotViewer";
import CommentBox from "../components/comments/CommentBox";
import { Context } from '../store/store'

const ProjectViewer = ({ location }) => {
  const technologySwicher = () => {
    let tempTechnology = null;
    switch (location.pathname) {
      case "/project/node":
        tempTechnology = { title: "NodeJs", extension: "node" };
        break;
      case "/project/java":
        tempTechnology = { title: "Java", extension: "java" };
        break;
      case "/project/vue":
        tempTechnology = { title: "VueJs", extension: "vue" };
        break;
      case "/project/react":
        tempTechnology = { title: "ReactJs", extension: "react" };
        break;
      default:
        break;
    }
    return tempTechnology;
  };

  const [collection, setData] = useState(null);
  const [state] = useContext(Context);
  const { Trans } = state;
  const technology = technologySwicher();
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    document.title = `Work I have done with ${technology.title}`;
    fetch(`${envURL}/projects/${technology.extension}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

  }, [location.pathname, updated]);

  const showModal = (value) => {
    const internalFiles = document.querySelectorAll(".modal");
    internalFiles.forEach((file) => {
      if (file.classList.contains(value)) {
        file.classList.toggle("modal-closed");
        file.classList.toggle("modal-opened");
      }
    });
  };

  const toggleClasses = (parentId) => {
    const internalFiles = document.querySelectorAll(".internal-files");
    const iconsToTurn = document.querySelectorAll(".icon-to-turn");
    internalFiles.forEach((file) => {
      if (file.classList.contains(parentId)) {
        file.classList.toggle("folder-closed");
        file.classList.toggle("folder-opened");
      }
    });
    iconsToTurn.forEach((icon) => {
      if (icon.classList.contains(parentId))
        icon.classList.toggle("turn-downwards");
    });
  };
  return (
    <>
      <main className="project-viewer-container light">
        <header className="project-viewer-title">
          <div className='page-default-title-icon'>
            <IconizeFile name={technology.extension} usingExtension />
          </div>
          <div>
            <h1 className="primary--text">
              {technology.title}
            </h1>
            <h4>
              <Trans i18nKey='projectViewer.mainTitle'>Applications and APIs</Trans>  
            </h4>
          </div>


        </header>
        <article className="all-projects fadeInUpx">
          {collection && collection.length
          ? collection.map((project) => (
            // eslint-disable-next-line react/jsx-indent
          
            <div className="project-container light" key={project._id}>
              <ScreenshotViewer screenshot={project.screenshot} title={project.title} />
              <div className='project-description-container'>
                <h1 className="project-title primary--text">
                  {project.title}
                </h1>
                <p>
                  <span className="project-description-label">
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      className="secondary--text"
                    />
                    {" "}
                    <Trans i18nKey='projectViewer.updated'>Updated on:</Trans>  
                  </span>{" "}
                  {new Date(project.date).toLocaleString("eng-US", {
                      dateStyle: "long",
                    })}
                </p>
                <p>
                  <span className="project-description-label">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="secondary--text"
                    />
                    {" "}
                    URL:
                  </span>{" "}
                  <a
                    target="_blank"
                    href={project.url}
                    rel="noopener noreferrer"
                  >
                    {project.url}
                  </a>
                </p>
                <p>
                  <span className="project-description-label">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="secondary--text"
                    />
                    {" "}
                    <Trans i18nKey='projectViewer.description'>Description:</Trans>
                  </span>{" "}
                  {project.description}
                </p>
              </div>
             
              <div className="file-container">
                <span className="bold"><Trans i18nKey='projectViewer.files'>Files</Trans></span>
                <>
                  <div key={project.code.file._id} className="file">
                    <button
                      type="button"
                      onClick={() => showModal(project.code.file._id)}
                      className="file-button"
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="primary--text"
                      />{" "}
                      {project.code.file.name}
                    </button>
                    <CodeModal
                      showModal={showModal}
                      code={project.code.file.content}
                      fileId={project.code.file._id}
                      name={project.code.file.name}
                    />
                  </div>
                  {project.code.dir.map((folder) => (
                    <div key={folder._id}>
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
                          className={`${folder._id} file internal-files folder-closed`}
                          key={childFile._id}
                        >
                          <button
                            type="button"
                            onClick={() => showModal(childFile._id)}
                            className="file-button "
                          >
                            {" "}
                            <FontAwesomeIcon
                              icon={faFile}
                              className="primary--text"
                            />{" "}
                            {childFile.name}
                          </button>
                          <CodeModal
                            showModal={showModal}
                            code={childFile.content}
                            fileId={childFile._id}
                            name={childFile.name}
                          />
                        </div>
                        ))}
                    </div>
                    ))}
                </>
              </div>
              <CommentBox setUpdated={setUpdated} itemId={project._id} pathname="/project" comments={project.comments} rating={project.rating} />
            </div>
          ))
          : (
            <article className="all-projects">
              <Loading message={`Loading the ${technology.title} projects!
              If it's taking too long, you should probably come back later`}
              />
            </article>
          )}
        </article>
      </main>
    </>
  );
};
ProjectViewer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: Proptypes.object,
}

export default ProjectViewer;