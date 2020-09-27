import React, { useContext, useState } from 'react';
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
import { saveComment, editComment, clearCommentInput, postRating } from './commentBoxFunctions';
import SignInFallback from './SignInFallback';
import  SaveChangesBtn from './SaveChangesBtn';

const CommentBox = ({ setUpdated, itemId, pathname, comments, rating }) => {
  const [state] = useContext(Context);
  const { Trans } = state;
  const [editingMode, setEditingMode] = useState(false);
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [fallback, setFallBack] = useState(false);

  const inputHandler = (event) => {
    setCommentInput(event.target.value);
    setErrors(commentValidator(commentInput).errors);
  };
  const userId = state.profile._id;
  const { isLoggedIn } = state;
  const options = ({
    userId, commentInput, itemId, setRequest, setEditingMode,
    setResponse, setErrors, pathname, setUpdated
  });

  const handleKeyPress = (event, comment) => {
    if (event.key === 'Enter') {
      if(editingMode){ 
        editComment({ ...options, comment })
    }else{
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
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  const handleEditing = (comment) => {
    setEditingMode(true);
    setSelectedComment(comment)
    const textInput = document.getElementById('comment-input');
    textInput.value = comment.comment;
    setCommentInput(comment.comment);
    textInput.focus({ preventScroll: false }); // check if it works without it
    selectElementContents(textInput);

  }


  return (
    <>
      <div className='comment-box-action'>
        <p>
          <span
            onClick={()=>postRating({...options, rating:"like"})}
            onKeyDown={()=>postRating({...options, rating:"like"})}
          >
            <small>{rating.filter((rate) => rate === "like").length}</small> {" "}
            <FontAwesomeIcon
              className="fa-lg"
              icon={faThumbsUp}
            />{" "}
          </span>
          <span
            onClick={()=>postRating({...options, rating:"dislike"})}
            onKeyDown={()=>postRating({...options, rating:"dislike"})}
          >
            <FontAwesomeIcon
              className="fa-lg fa-flip-horizontal	"
              icon={faThumbsDown}
            />
            {" "}
            <small>{rating.filter((rate) => rate === "dislike").length}</small>
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
        <p> <FontAwesomeIcon
          className="fa-lg"
          icon={faShareAlt}
        />{" "}<Trans i18nKey='commentBox.share'>Share</Trans>
        </p>
      </div>


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
                    onKeyDown={(e)=> handleKeyPress(e, selectedComment)}
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
        comments.map((comment) => (
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

            <small className={(editingMode) ? `being-edited`:''}>{new Date(comment.date).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute:'2-digit'
            })}
            </small>


          </div>
        )
        )
      }
    </>
  )
}
CommentBox.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string
  })),

  itemId: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  rating: PropTypes.arrayOf(PropTypes.oneOf(["like", "dislike"])),
  setUpdated: PropTypes.func.isRequired,
  
}

CommentBox.defaultProps = {
  rating: ['like'],
  itemId: "",
  comments: [{
    date: "2020-09-19T01:40:11.205Z",
    _id: "5f65617b0f3d440ba831f52c",
    comment: "no comment",
    userId: "5f221a90a53baf4da8b304d3"
  }]
}

export default CommentBox; 