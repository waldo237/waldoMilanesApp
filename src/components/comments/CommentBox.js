import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faShareAlt, faCommentAlt, faThumbsDown, faThumbsUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import './CommentBox.scss'
import PropTypes from 'prop-types'
import { Context } from '../../store/store';
import CommentActions from './CommentActions';
import { ClickAwayCloser, removeDisplayNone } from '../Nav/ClickAwayCloser';
import commentValidator from './commentValidator';
import ResponseAlert from '../ResponseAlert/ResponseAlert';
import ErrorCard from '../ErrorCard/ErrorCard';
import { saveComment, editComment, clearCommentInput, postRating, getComments, getRating, shareLink } from './commentBoxFunctions';
import SignInFallback from './SignInFallback';
import SaveChangesBtn from './SaveChangesBtn';
import DefaultShareModal from './DefaultShareModal';


const CommentBox = ({  itemId, pathname,  infoToShare }) => {
  // state and variables
  const [state] = useContext(Context);
  const { Trans } = state;

  const [comments, setComments] = useState([{
    date: "00000000",
    _id: "00000000",
    comment: " _",
    userId: "00000000"
  }]);
  const [updated, setUpdated] = useState(false);
  const [rating, setRating] = useState([]);
  const [displayableErrors, setErrors] = useState([]);
  const [editingMode, setEditingMode] = useState(false);
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [fallback, setFallBack] = useState(false);

  const userId = state.profile._id;
  const { isLoggedIn } = state;
  const options = ({
    userId, commentInput, itemId, setRequest, setEditingMode,
    setResponse, setErrors, pathname, setUpdated,
    setComments, setRating, infoToShare
  });

  /* actions */
  const inputHandler = (event) => {
    setCommentInput(event.target.value);
    setErrors(commentValidator(commentInput).errors);
  };

  const handleKeyPress = (event, comment) => {
    if (event.key === 'Enter') {
      if (editingMode) {
        editComment({ ...options, comment })
      } else {
        saveComment(options);
      }
    }
  }
  const openCommentOptions = (comment) => {
    removeDisplayNone(`comment-actions-${comment._id}`);
    setEditingMode(false);
    setSelectedComment({});
    setCommentInput("");
    clearCommentInput();
  };

  function selectElementContents(el) {
    if (typeof window !== `undefined`) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  const handleEditing = (comment) => {
    if (typeof window !== `undefined`) {
      setEditingMode(true);
      setSelectedComment(comment)
      const textInput = document.getElementById('comment-input');
      textInput.value = comment.comment;
      setCommentInput(comment.comment);
      textInput.focus({ preventScroll: false }); // check if it works without it
      selectElementContents(textInput);
    }
  }

  /* effects */
  useEffect(() => {
    getComments(options);
    getRating(options);

  }, [updated])


  return (
    <>
      <div className='comment-box-action'>

        <p>
          <span
            onClick={() => postRating({ ...options, rating: "like" })}
            onKeyDown={() => postRating({ ...options, rating: "like" })}
          >
            <small>{rating.length ? rating.filter((rate) => rate === "like").length : 0}</small> {" "}
            <FontAwesomeIcon
              className="fa-lg"
              icon={faThumbsUp}
            />{" "}
          </span>
          <span
            onClick={() => postRating({ ...options, rating: "dislike" })}
            onKeyDown={() => postRating({ ...options, rating: "dislike" })}
          >
            <FontAwesomeIcon
              className="fa-lg fa-flip-horizontal	"
              icon={faThumbsDown}
            />
            {" "}
            <small>{rating.length ? rating.filter((rate) => rate === "dislike").length : 0}</small>
            {" "}
          </span>
          {/* <Trans i18nKey='commentBox.impression'>Impression</Trans> */}
        </p>
        <p> <small>{comments.length}</small>  <FontAwesomeIcon
          className="fa-lg"
          icon={faCommentAlt}
        />{" "}
          <Trans i18nKey='commentBox.comments'>Comments</Trans>
        </p>
        <div className="shareBtn" onKeyDown={() => shareLink(options)} onClick={() => shareLink(options)}>
          <p> <FontAwesomeIcon
            className="fa-lg"
            icon={faShareAlt}
          />{" "}<Trans i18nKey='commentBox.share'>Share</Trans>
          </p>
        </div>
      </div>

      <DefaultShareModal infoToShare={infoToShare} composeUrlWithId />
      <div className='comment-box-comment'>
        {(fallback)
          ? <SignInFallback />
          : (
            <div className='comment-box-comment'>
              <div className="form-group">
                <label className="input" htmlFor="comment-input"> <Trans i18nKey='commentBox.write'>Write a comment</Trans>
                  <input
                    id="comment-input"
                    name="comment"
                    type="text"
                    className="form-control"
                    placeholder="Write a comment"
                    onKeyDown={(e) => handleKeyPress(e, selectedComment)}
                    onChange={(isLoggedIn) ? inputHandler : () => setFallBack(true)}
                  />
                </label>
                {response ? (<ResponseAlert response={response} setResponse={setResponse} />) : null}
                {(displayableErrors) ? <ErrorCard errors={displayableErrors} setErrors={setErrors} /> : null}
              </div>

              {(editingMode)
                ? <SaveChangesBtn options={options} comment={selectedComment} requestStarted={requestStarted} />
                : (
                  <FontAwesomeIcon
                    className="fa-lg"
                    icon={faPaperPlane}
                    onClick={() => saveComment(options)}
                    onKeyDown={() => saveComment(options)}
                  />
                )}
            </div>
          )}
      </div>

      {
        (comments && comments.length)
          ? comments.map((comment) => (
            <div className="comment-display" key={comment._id}>
              { (state.profile._id === comment.userId)
                ? (
                  <div>
                    <FontAwesomeIcon
                      id={`comment-options-btn-${comment._id}`}
                      className="comment-btn"
                      icon={faEllipsisH}
                      onClick={() => openCommentOptions(comment)}
                      onKeyDown={() => openCommentOptions(comment)}

                    />

                    {(!editingMode)
                      ? (
                        <ClickAwayCloser exceptionById={`comment-options-btn-${comment._id}`}>
                          <CommentActions comment={comment} handleEditing={handleEditing} options={options} />
                        </ClickAwayCloser>
                      )
                      : null}
                  </div>
                )
                : null}
              <div className='comment-text-container'>
                <p
                  className={(editingMode) ? `being-edited comment-text-${comment._id}` : `comment-text-${comment._id}`}
                >
                  {comment.comment}
                </p>
              </div>

              <small className={(editingMode) ? `being-edited` : ''}>{new Date(comment.date).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
              </small>
            </div>
          ))
          : null
      }
     
    </>
  )
}
CommentBox.propTypes = {

  infoToShare: PropTypes.shape(
    { 
      title: PropTypes.string.isRequired,
       description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired, 
        composeUrlWithId: PropTypes.bool
      }
      ).isRequired,
  itemId: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
}


export default CommentBox; 
