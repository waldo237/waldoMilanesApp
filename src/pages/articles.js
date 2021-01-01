/* eslint-disable camelcase */

/* TODO
    PLANT THE INCOMING ARTICLES IN THE LOCALSTORAGE OR USE SERVICE WORKER
*/

import React, { useState, useEffect, useContext } from "react";
import "./articles.scss";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import envURL from '../envURL';
import Loading from "../components/Loading/Loading";
import { Context } from "../store/store";
import SEO from "../components/seo";
import Filter  from "../components/Filter/Filter";

const Articles = () => {
  const [state, dispatch] = useContext(Context);
  const [articles, setArticles] = useState([]);
  const [displayableArr, setDisplayableArray] = useState([]);
  const { Trans } = state;
 const setData = (data)=>{
  dispatch({type: 'SET_ARTICLES', payload: data});
  setArticles(data);
  setDisplayableArray(data);
 }
  useEffect(()=>{
    if (typeof window !== `undefined`) {
    const elemWithLazyTrans = document.querySelectorAll(".lazy-effect");
    elemWithLazyTrans.forEach((item)=>{
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) =>
           (entry.isIntersecting && !item.classList.contains('fadeInUpx')) ? item.classList.add("fadeInUpx"): ''
          );
        }, );
        observer.observe(item);
    }, {  rootMargin: "100px" })
  }
});
  useEffect(() => {
    fetch(`${envURL}/articles`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [state.articles]);

  return (
    <>
      <SEO 
        title="My articles and posts" 
        description="I love sharing my experience and ideas through writing. Don't miss my posts about programming."
      />
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


        <Filter
          items={articles}
          itemType={<Trans i18nKey='articles.article'>article</Trans>} 
          setDisplayableArray={setDisplayableArray}
        />
        {displayableArr.length
        ?displayableArr.map((item) => (
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
                  to={`/singleArticle/?${item._id}`}
                  className="primary--text hover-underline-yellow"
                >
                  <Trans i18nKey='articles.readMore'>Read more</Trans>  
                </Link>
              </small>
            </div>
          </article>
        ))
        : (
          <article className="article-card">
            <Loading message="Loading the items! ...If it's taking too long, you should probably come back later" />
          </article>
        )}
      </main>
    </>
  );
};
export default Articles;
