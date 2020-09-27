import React from "react";
import "./Technologies.scss";
import { Link } from "gatsby";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Technologies = () => {
  const projects = [
    {
      url: "/project/node",
      icon: faNodeJs,
      title: "NodeJs",

    },
    {
      url: "/project/java",
      icon: faJava,
      title: "Java",

    },
    {
      url: "/project/vue",
      icon: faVuejs,
      title: "VueJS",

    },
    {
      url: "/project/react",
      icon: faReact,
      title: "ReactJS",
  
    },
  ];
  return (
    <>
      <div className="technology-wrapper">
        {projects.map((project) => (
          <article
            key={project.url}
            className="hoverable-card"
          >
            <Link to={project.url} className="link">
              <div className="technology-card lazy-effect">
                <FontAwesomeIcon
                  className="fa-5x light--text tech-icon"
                  icon={project.icon}
                />
                <h3 className=" light--text technology-title">
                  {project.title}
                </h3>
              </div>
            </Link>

          </article>
        ))}

      </div>
    </>
  );
};

export default Technologies;
