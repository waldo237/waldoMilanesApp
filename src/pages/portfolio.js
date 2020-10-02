import React, {  useContext } from "react";
import "./portfolio.scss";
import { Link } from "gatsby";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {uuidv4} from '../components/gobalUtil'
import { Context } from "../store/store";
import SEO from "../components/seo";

const Portfolio = () => {
  const [state]= useContext(Context);
  const {Trans} = state;

  const projects = [

    {
      id: uuidv4(),
      url: "/project/java",
      icon: faJava,
      title: <Trans i18nKey="portfolio.java.title">Desktop Apps and RESTful APIs I have done with Java </Trans>,
      description:
  <Trans i18nKey="portfolio.java.desc">Since it was the first programming language I learned, I have a special place for Java. It has a huge community and it has been tested for decades. I like how it takes care of the developer experience; allowing you to know upfront what is permitted and what is not. I was introduced to the concepts of object-oriented programming using Java. It certainly gave me a solid basis to understand common design patterns and data structures. &nbsp; Another huge advantage that Java has is that you are forced to explicitly use datatypes when you are declaring a variable, so it makes you reflect on the importance of it.</Trans>
    },
    {
      id: uuidv4(),
      url: "/project/node",
      icon: faNodeJs,
      title: <Trans i18nKey="portfolio.node.title">Servers and RESTful APIs I have done with NodeJS</Trans>,
      description: <Trans i18nKey='portfolio.node.desc'>After having experience designing RESTful APIs in Java, I started working with NodeJS. Personally, I like this implementation of JavaScript outside the browser because it allows me to develop a whole application using one language from start to finish. Additionally, when I combine it with Express, it offers a very clean and concise touch to how my code looks. The concept of &ldquo;middleware&ldquo; is also a brilliant architecture; just the fact that you can plug a middleware to an existing endpoint and add new functionality, makes it feel like magic.</Trans>
        
    },
    {
      id: uuidv4(),
      url: "/project/vue",
      icon: faVuejs,
      title: <Trans i18nKey="portfolio.vue.title">Web Apps I have built with VueJS</Trans>,
      description:
  <Trans i18nKey="portfolio.vue.desc">VueJS was the first front-end framework I learned. It does a great job of simplifying a lot of the regular tasks involved in front-end development, such as modeling data, looping through arrays, and using conditionals. I discovered the concept of the rendering lifecycle while experimenting with Vue. I also learned a lot about state management and how to enforce a global state by using Vuex.</Trans> ,
    },
    {
      id: uuidv4(),
      url: "/project/react",
      icon: faReact,
      title: <Trans i18nKey="portfolio.react.title">My projects done with ReactJS</Trans>,
      description:
  <Trans i18nKey="portfolio.react.desc">In my experience, React is a very robust framework that allows for the manipulation of the DOM object in a very similar way as Vanilla JavaScript. The idea of the one-way data binding brings an understanding of data immutability and that WE, as developers, need to find ways to respect this principle. My journey with the libraries surrounding React has been quite pleasant; they are very well-documented and mature.</Trans>
    },
  ];
 const PortfolioTitleIcon = () => {
    return (
      <>
        <div className='portfolio-title-icon hoverable-card'>
          <svg xmlns="http://www.w3.org/2000/svg" height="50pt" viewBox="0 0 64 64" width="50pt"><g id="Bag"><path d="m61 59v-30l-13 10h-32l-13-10v30a2 2 0 0 0 2 2h54a2 2 0 0 0 2-2z" fill="#a97c50" /><path d="m30 61h29a2 2 0 0 0 2-2v-22c0 13.266-13.865 24-31 24z" fill="#8b5e3c" /><path d="m48 39h-32l-13-10v2l13 10h32l13-10v-2z" fill="#8b5e3c" /><path d="m48 39 13-10v-6a2 2 0 0 0 -2-2h-54a2 2 0 0 0 -2 2v6l13 10z" fill="#c49a6c" /><path d="m34 35h-4a1 1 0 0 0 -1 1v3h6v-3a1 1 0 0 0 -1-1z" fill="#58595b" /><path d="m29 44a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h-6z" fill="#6d6e71" /><path d="m55 18a1 1 0 0 0 -1-1h-2a1 1 0 0 0 -1 1v3h4z" fill="#ffcd00" /><path d="m13 18a1 1 0 0 0 -1-1h-2a1 1 0 0 0 -1 1v3h4z" fill="#ffcd00" /><path d="m23 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8h4v-8a6 6 0 0 0 -6-6h-14a6 6 0 0 0 -6 6v8h4z" fill="#58595b" /></g></svg>
        </div>
      </>
    );
  };
  return (
    <>
      <SEO 
        title="Technologies I am proficient at. ReactJs | VueJS | NodeJs | Java | JavaScript" 
        description="Desktop Apps and RESTful APIs I have done with Java. User Interfaces I have built with ReactJS. Web Apps I have built with VueJS. Servers and RESTful APIs I have done with NodeJS"
      />
      <main className="portfolio-container light fadeInUpx"> 
        <header className="porfolio-title primary--text ">
          <PortfolioTitleIcon /> 
          <div> 
            <h1> <Trans i18nKey='portfolio.title.h1'>My Work</Trans> </h1>
            <h4><Trans i18nKey='portfolio.title.h4'>A collection of projects</Trans> </h4>
          </div> 
        </header>
        {projects.map((project) => (
          <article
            key={project.id}
            className="hoverable-card technology-container"
          >
            
            <Link to={project.url} className="link">
              <div className="technology-icon"><FontAwesomeIcon
                className="fa-3x"
                icon={project.icon}
              />
              </div> 
              <h1 className=" technoly-title">
                {project.title}
              </h1>
            </Link>
            <p> {project.description} </p>
          </article>
        ))}
      </main>
    </>
  );
};

export default Portfolio;
