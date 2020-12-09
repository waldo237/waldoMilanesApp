import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import envURL from '../envURL';
import './singleArticle.scss'
import CommentBox from '../components/comments/CommentBox';
import { Context } from '../store/store';
import SEO from '../components/seo';
import {isEmpty} from 'lodash'

const SingleArticle =({location})=>{
  const [state, dispatch] = useContext(Context);  
  const [articleData, setData] = useState(null);


  const fetchSelectedArticle =()=> {
    fetch(`${envURL}/article/${location.search.split('?')[1]}`)
    .then((res) => res.json())
    .then((data)=> dispatch({type: 'SET_SELECTED_ARTICLE', payload: data}))
    .catch(console.error);
  }
    useEffect(() => { 
      setData(state.selectedArticle);
 
    })
    useEffect(() => {
    
        fetchSelectedArticle();
    
      }, [ location.pathname, location.search]);

    return (
      <>
      
        <SEO 
          title={`A post written by Waldo milanes - ${state.selectedArticle.title}`}
          description={state.selectedArticle.body}
          image={state.selectedArticle.photo}
        />
        <main className='single-article-container light'>
          {(! isEmpty(articleData))? (
           
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
              <CommentBox 
                infoToShare={{ title: articleData.title, description: articleData.body, url: `/article`, hash:`${articleData._id}` }} 
                itemId={articleData._id} 
                pathname="/article" 
                updated
              />
            </div>
            ):null}
        </main>
      </>
)
}

SingleArticle.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  location: Proptypes.object,
}
export default SingleArticle;

