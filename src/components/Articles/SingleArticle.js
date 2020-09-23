import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import envURL from '../../envURL';
import './SingleArticle.scss'
import CommentBox from './CommentBox';
import { Context } from '../../store/store';

const SingleArticle =({match})=>{
  const [state, dispatch] = useContext(Context);  
  const [articleData, setData] = useState(null);
  const [updated, setUpdated] = useState(false);

  const fetchSelectedArticle =()=> {
    fetch(`${envURL}${match.url}`)
    .then((res) => res.json())
    .then((data)=> dispatch({type: 'SET_SELECTED_ARTICLE', payload: data}))
    .catch(console.error);
  }
    useEffect(() => { 
      setData(state.selectedArticle);
      document.title = state.selectedArticle.title;
    })
    useEffect(() => {
        document.title = `One of my articles.`;
        fetchSelectedArticle();
    
      }, [updated,match.url, match.params.article]);

    return (
      <>
        <main className='single-article-container light'>
          {(articleData)? (
           
            <div className='single-article-card'>
              <h1 className='single-article-title'>{articleData.title}</h1>
              <picture className="single-article-img">
                <source media="(min-width:650px)" srcSet={articleData.photo} />
                <source media="(min-width:465px)" srcSet={articleData.photo} />
                <img
                  className="single-article-img"
                  src={articleData.photo}
                  alt={`${articleData.title}-view`}
                />
              </picture>
              <small className='single-article-date'>
                Pubished on: {" "} {new Date(articleData.date).toLocaleString("eng-US", {
                      dateStyle: "long",
                    })}
              </small>
              <p className="single-article-text">{articleData.body}</p> 
              <CommentBox setUpdated={setUpdated} itemId={articleData._id} pathname="/article" comments={articleData.comments} rating={articleData.rating} />
            </div>
            ):null}
        </main>
      </>
)
}

SingleArticle.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  match: Proptypes.object.isRequired,
}
export default SingleArticle;

