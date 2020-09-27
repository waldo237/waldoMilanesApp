import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { deleteComment } from './commentBoxFunctions'
import { Context } from "../../store/store";

function CommentActions({comment, handleEditing, options}) {
  const [state] = useContext(Context);
  const { Trans } = state;
    return (
      <div id={`comment-actions-${comment._id}`} className="comment-options fade">
        <div className="comment-card">
          <div
            className="commnet-action" 
            onClick={()=> handleEditing(comment)}
            onKeyDown={()=> handleEditing(comment)}
          >
            <FontAwesomeIcon
              className="commnet-action-icon"
              icon={faPencilAlt}
            />
            <p>
              <Trans i18nKey='comment.editComment'>Edit comment</Trans>
            </p> 
          </div>
          <div
            className="commnet-action"
            onClick={()=> deleteComment({...options, comment})}
            onKeyDown={()=> deleteComment({...options, comment})}
          >
            <FontAwesomeIcon
              className="commnet-action-icon"
              icon={faTrashAlt}
            />
            <p>
              <Trans i18nKey='comment.deleteComment'>Delete comment</Trans>
            </p> 
          </div>
         
        </div>
      </div>
    )
}
CommentActions.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    comment: PropTypes.string,
    date: PropTypes.string,
    userId: PropTypes.string
  }),
  handleEditing: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object.isRequired,

}
  
  CommentActions.defaultProps = {
    comment: {
      date: new Date("2020-09-19T01:40:11.205Z"),
      _id: "5f65617b0f3d440ba831f52c",
      comment: "no comment",
      userId: "5f221a90a53baf4da8b304d3"
    }
}
export default CommentActions
