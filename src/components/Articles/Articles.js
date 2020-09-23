/* eslint-disable camelcase */

/* TODO
    PLANT THE INCOMING ARTICLES IN THE LOCALSTORAGE OR USE SERVICE WORKER
*/

import React, { useState, useEffect, useContext } from "react";
import "./Articles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import envURL from '../../envURL';
import Loading from "../Loading/Loading";
import { Context } from "../../store/store";

const Articles = () => {
  const [state, dispatch] = useContext(Context);
  const [articles, setArticles] = useState(null);
  const { Trans } = state;
 const setData = (data)=>{
  dispatch({type: 'SET_ARTICLES', payload: data});
  setArticles(data);
 }
  // const [articles, setData] = useState([]);
  useEffect(()=>{
    const moreAboutMe = document.querySelectorAll(".lazy-effect");
    moreAboutMe.forEach((item)=>{
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) =>
           (entry.isIntersecting && !item.classList.contains('fadeInUpx')) ? item.classList.add("fadeInUpx"): ''
          );
        }, );
        observer.observe(item);
    }, {  rootMargin: "100px" })
});
  useEffect(() => {
    document.title = "Articles I have written";
    fetch(`${envURL}/articles`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
     
       
  }, [state.articles]);

  return (
    <>
      <main className="articles-container light">
        <header className="articles-title">
          <div className='page-default-title-icon'>
            <FontAwesomeIcon
              className="fa-2x"
              icon={faFeatherAlt}
            />{" "}
          </div>
          <div>
            <h1 className="primary--text">
              <Trans i18nKey='articles.titleArticles'>Articles</Trans>
            </h1>
            <h4>
              
              <Trans i18nKey='articles.titleSub'>Compositions related to software</Trans>
            </h4>
          </div>
        </header>
        
        {articles && articles.length
        ?articles.map((item) => (
          <article
            key={item._id}
            className="article-card lazy-effect"
          >
            <div className='article-img-wrapper'>
              <picture>
                <source media="(min-width:650px)" srcSet={item.photo} />
                <source media="(min-width:465px)" srcSet={item.photo} />
                <img
                  className="article-img"
                  src={item.photo}
                  alt={`${item.title}-view`}
                />
              </picture>
            </div>
            <div>
              <h1 className="articles-card-title primary--text">{item.title} </h1>
              <small>
                <Trans i18nKey='articles.pubished'>Pubished on:</Trans>   {" "} 
                {new Date(item.date).toLocaleString("eng-US", {
                      dateStyle: "long",
                    })}
              </small>
              <p className="article-body"> {item.body} </p>
              <small className="read-more-wrapper">
                <Link
                  to={`article/${item._id}`}
                  className="primary--text hover-underline-yellow"
                >
                  <Trans i18nKey='articles.readMore'>Read more</Trans>  
                </Link>
              </small>
            </div>
          </article>
        ))
        : (
          <article className="all-projects">
            <Loading message="Loading the items! ...If it's taking too long, you should probably come back later" />
          </article>
        )}
      </main>
    </>
  );
};
export default Articles;
