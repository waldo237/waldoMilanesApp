import React, { useContext } from "react";
import "./projectViewer.scss";
import Proptypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faCalendarCheck,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from 'lodash';
import IconizeFile from "../components/ProjectViewer/IconizeFile";
import Loading from "../components/Loading/Loading";
import ScreenshotViewer from "../components/ProjectViewer/ScreenshotViewer";
import CommentBox from "../components/comments/CommentBox";
import { Context } from '../store/store'
import SEO from "../components/seo";
import Directory from "../components/ProjectViewer/Directory";
import File from "../components/ProjectViewer/File";
import { centerModal } from "../components/gobalUtil";

const ProjectViewer = ({ pageContext }) => {
 const pageContextArr = Object.values(pageContext);
  if (isEmpty(pageContextArr)) {
    return null;
  }


  const technologySwicher = () => {
    let tempTechnology = null;

    switch (pageContextArr[0].technology) {
      case "node":
        tempTechnology = { title: "NodeJs", extension: "node" };
        break;
      case "java":
        tempTechnology = { title: "Java", extension: "java" };
        break;
      case "vue":
        tempTechnology = { title: "VueJs", extension: "vue" };
        break;
      case "react":
        tempTechnology = { title: "ReactJs", extension: "react" };
        break;
      default:
        break;
    }
    return tempTechnology;
  };
  const technology = technologySwicher();

  const [state] = useContext(Context);
  const { Trans } = state;


  const projectArray = pageContextArr;
  const showModal = (value) => {
    if (typeof window !== `undefined`) {
      const internalFiles = document.querySelectorAll(".modal");
      internalFiles.forEach((file) => {
        if (file.classList.contains(value)) {
          file.classList.toggle("modal-closed");
          file.classList.toggle("modal-opened");
          centerModal(file);
          file.style.position = `fixed`;
          file.style.top = `${window.pageYOffset + (file.offsetHeight / 2)}px`
        }
      });
    }
  };

  const toggleClasses = (parentId) => {
    if (typeof window !== `undefined`) {
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
    }
  };

  return (
    <>
      { (technology)
        ? (
          <main className="project-viewer-container light">
            <SEO
              title={`Work I have done with ${technology.title}`}
              description="Some code samples of working projects that demonstrate the coding skills I have gained over the years. Feel free to take a look at my code."
            />
            <header className="project-viewer-title">
              <div className='page-default-title-icon'>
                <IconizeFile name={pageContext.technology} usingExtension />

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
              {

                projectArray && projectArray.length
                  ? projectArray.map((project) => (
                    // eslint-disable-next-line react/jsx-indent

                    <div className="project-container light" key={project._id}>
                      <ScreenshotViewer screenshotImage={project.screenshotImage} screenshot={project.screenshot} title={project.title} />
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
                          {(project.code.file)
                            ? <File showModal={showModal} file={project.code.file} />
                            : null}

                          {project.code.dir.map((folder) => (
                            <Directory key={folder._id} folder={folder} toggleClasses={toggleClasses} showModal={showModal} />
                          ))}
                        </>
                      </div>
                      <CommentBox
                        infoToShare={{ title: project.title, description: project.description, url: `/project/${ project.technology }`, hash:`${project._id}` }} 
                        itemId={project._id}
                        pathname="/project"
                        updated
                      />
                    </div>
                  ))
                  : (
                    <article className="all-projects">
                      <Loading message={`Loading the ${technology.title} projects!
              If it's taking too long, you should probably come back later`}
                      />
                    </article>
                  )
              }
            </article>
          </main>
        )
        : null}
    </>
  );
};
ProjectViewer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // location: Proptypes.object,
}

export default ProjectViewer;