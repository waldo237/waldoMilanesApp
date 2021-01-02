import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons'
import lmo from "../../static/certificates/lmo.pdf";
import softDev from "../../static/certificates/softwareDev.pdf";
import java from "../../static/certificates/java.pdf";
import SQL from "../../static/certificates/SQL.pdf";
import webDev from "../../static/certificates/webDev.pdf";
import node from "../../static/certificates/node.pdf";
import vue from "../../static/certificates/vue.pdf";
import MERN from "../../static/certificates/MERN.pdf";
import oregon from "../../static/certificates/oregon.pdf";
import ma from "../../static/certificates/ma.pdf";
import { Context } from '../../store/store'
import { uuidv4 } from '../gobalUtil'

const Education = () => {
  const [state] = useContext(Context);
  const { Trans } = state;
  const educationPoints = [
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career1T">Bachelors of Arts in Modern Languages</Trans>,
      duration: new Date(2011, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career1U">Santiago University of Technology (UTESA)</Trans>,
      place: <Trans i18nKey="education.career1P">Dominican Republic</Trans>,
      url: lmo,
      description:
  <Trans i18nKey="education.career1D">
    The ability to communicate clearly in two foreign languages (English and French), both verbally and in writing; professional communication, spoken and written; sensitivity to different cultural contexts; the ability to work independently; general research skills; self-reflection and critical judgment; self-management, including planning and meeting deadlines; analyzing written and visual sources; adaptability and flexibility.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career2T">Computer Programming</Trans>,
      duration: new Date(2017, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career2U">Technological Institute of the Americas (ITLA)</Trans>,
      place: <Trans i18nKey="education.career2P">Dominican Republic</Trans>,
      url: softDev,
      description:
  <Trans i18nKey="education.career2D">
    The fundamentals of programming; algorithms and data structures; software testing and debugging; a solid foundation of object-oriented software development; design patterns, the essentials of networking; design and management of relational databases; project requirements gathering and prototyping.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career3T">Intermediate Java Programming</Trans>,
      duration: new Date(2018, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career3U">Technological Institute of the Americas (ITLA)</Trans>,
      place: <Trans i18nKey="education.career3P">Dominican Republic</Trans>,
      url: java,
      description:
  <Trans i18nKey="education.career3D">
    Basic concepts, logic and syntax of the Java programming language, event-driven programming, sequential and associative data structures, classic data structures, sorting and searching, exception handling, database programming with JDBC, networking programming, GUI development using Swing, multithreading, Java Applets, web applications (Servlets), advanced I/O classes, regular expressions, Java graphics, introduction to Spring using Spring Boot.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career4T">Database Design and SQL</Trans>,
      duration: new Date(2018, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career4U">Technological Institute of the Americas (ITLA)</Trans>,
      place: <Trans i18nKey="education.career4P">Dominican Republic</Trans>,
      url: SQL,
      description:
  <Trans i18nKey="education.career4D">
    The foundation of database programming: planning a database, relational databases, records, data types, adding validation rules, normalization and denormalization, referential integrity, ACID transactions, SQL queries, CRUD operations, sorting results, and joining tables.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career5T">Become a web developer & JavaScript</Trans>,
      duration: new Date(2018, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career5U">LinkedIn Learning</Trans>,
      place: <Trans i18nKey="education.career5P">Online</Trans>,
      url: webDev,
      description:
  <Trans i18nKey="education.career5D">
    The basics of HTML, CSS fundamental concepts; CSS box model, Flexbox and Grid. JavaScript core principles like variables, data types, conditionals, loops, and DOM scripting; higher-order functions, IIFE functions, scopes, and closure; partial application and recursion; prototypes and classes; callbacks and promises, JS module system. Version control software; the use of Git.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career6T">Become a NodeJs Developer</Trans>,
      duration: new Date(2019, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career6U">LinkedIn Learning</Trans>,
      place: <Trans i18nKey="education.career6P">Online</Trans>,
      url: node,
      description:
  <Trans i18nKey="education.career6D">
    The global object, Importing the core modules, creating custom events with the EventEmitter, reading; writing; and removing files, working with file streams, creating child processes with the exec and spawn functions, managing third-party packages with npm, REST APIs, Node.js frameworks, creating a basic Express.js application, managing data to MongoDB with Mongoose, error handling and debugging, consulting OWASP resources and handling security threats, adding two-factor and read-only tokens, encrypting user data and session management, adding HTTPS protocol to an application, using cookie attributes, continuous deployment faAssistiveListeningSystems.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career7T">Become a Vue Developer</Trans>,
      duration: new Date(2019, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career7U">LinkedIn Learning</Trans>,
      place: <Trans i18nKey="education.career7P">Online</Trans>,
      url: vue,
      description:
  <Trans i18nKey="education.career7D">
    Basics of Vue.js, working with templates, binding classes with objects and arrays, creating transitions and animations, building routes and creating route links, loading modules, importing and looping through data, using props; methods; and events, Vue Router, and Vuex.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career8T">Become a MERN Stack JavaScript Developer</Trans>,
      duration: new Date(2020, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career8U">LinkedIn Learning</Trans>,
      place: <Trans i18nKey="education.career8P">Online</Trans>,
      url: MERN,
      description:
  <Trans i18nKey="education.career8D">

    React.js fundamentals, creating and rendering React elements, introducing JSX, creating a React component, managing state with hooks, using multi-state variables, fetching data, using React-Router links, Redux essentials.
  </Trans>
    },

    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career9T">Effective Assessment Practices Certification</Trans>,
      duration: new Date(2019, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career9U">University of Oregon</Trans>,
      place: <Trans i18nKey="education.career9P">Eugene, Oregon, USA</Trans>,
      url: oregon,
      description:
  <Trans i18nKey="education.career9D">
    Up-to-date information about current methodologies associated with assessment practices in the language-learning classroom. It includes: learning outcomes, aligning instructional practices with assessments, writing good test items / informal test analysis, formative assessment, performance-based assessments, rubrics.
  </Trans>
    },
    {
      id: uuidv4(),
      career: <Trans i18nKey="education.career10T">Master of Arts in Applied Linguistics</Trans>,
      duration: new Date(2020, 11, 15).getFullYear(),
      university: <Trans i18nKey="education.career10T">Autonomous University of Santo Domingo (UASD)</Trans>,
      place: <Trans i18nKey="education.career10P"> Dominican Republic</Trans>,
      url: ma,
      description:
  <Trans i18nKey="education.career10D">
    Knowledge of the disciplines and subdisciplines of the field in English linguistics; familiarization with ICT for the teaching and learning of the English language. Consciousness-raising for intercultural aspects which have an impact on communication, translation, and mediation. Understanding and integration of mass and complex information coming from different sources. The ability to carry out theoretical and/or empirical research, expressing the outcome in articles, essays.  Ability to present the outcome of one’s research publicly. Attitude for teamwork, with the consequent skills, that it entails: negotiating, make oneself understood, provide and/or accept constructive criticism. Attitude for independent work, development of the initiative to organize one’s time and effort effectively.
  </Trans>
    },
  ];
  return (
    <>
      <div id="education-container">
        <div className="education-title">
          <h1 className=" primary--text ">Education</h1>

        </div>
        {educationPoints.map((item) => (
          <div key={item.id} className="education-card lazy-effect">
            <div className='education-date-and-place'>
              <h2>
                {item.duration}
              </h2>
              <h3>
                {item.place}
              </h3>
            </div>
            <div className="education-description-card shadow hoverable-card">
              <h4>{item.university}</h4>
              <div className='education-institution'>
                <h5>{item.career}  &nbsp;</h5>
              </div>
              <p> {item.description} </p>
              <div>
                <a href={item.url} target='_blank' rel="noopener noreferrer">

                  <button type='button' className=" diploma-btn"><FontAwesomeIcon icon={faEye} /> &nbsp;<Trans i18nKey='education.diplomaBtn'>View Credential</Trans></button>
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </>
  )
}

export default Education