import envURL from '../../envURL';

import { getTokenFromLocalStorage } from "../gobalUtil";
import commentValidator from "./commentValidator";

const clearCommentInput = () => {
  document.getElementById('comment-input')
    .value = '';
}
/**
 * @function addComment sends the new comment to the server.
 * @param options:object containing the other parameters
 * @param {*} commentInput: string longer than 3 characters.
 * @param {*} itemId :string the uid of the item subject to the comment.
 * @param {*} setRequest :function useState(object:{message:string, successful:boolean, link:url})
 * @param {*} setResponse :function useState(object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors :function useState(errors:array)
 *  @param pathname:string -- a URI
 */
const saveComment = (options) => {

  const { userId, commentInput, itemId, setRequest, setResponse, setErrors, pathname, setUpdated } = options;
  const token = getTokenFromLocalStorage();

  if (commentValidator(commentInput).valid) {
    setRequest(true);
    const sanitizedData = {
      comment: commentValidator(commentInput).sanitized,
      userId,
      id: itemId
    };
    fetch(`${envURL}${pathname}/comment`, {
      method: "POST",
      headers: {
        'Authorization': `JWT ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(sanitizedData),
    })
      .then((res) => {
        return res.json()
          .then(jsonRes => {
            return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
          });
      })
      .then(setResponse)
      .then(() => setRequest(false))
      .then(() => setUpdated(Math.random()))
      .then(() => clearCommentInput())
      .catch(console.error);
  } else {
    setErrors(commentValidator(commentInput).errors);
  }
}

/**
* @function editComment sends the new comment to the server.
* @param options:object containing the other parameters
* @param {*} commentInput: string longer than 3 characters.
* @param {*} itemId :string the uid of the item subject to the comment.
* @param {*} setRequest :function useState(object:{message:string, successful:boolean, link:url})
* @param {*} setResponse :function useState(object:{message:string, successful:boolean, link:url})
* @param {*} setErrors :function useState(errors:array)
*  @param pathname:string -- a URI
*/
const editComment = (options) => {

  const { userId, commentInput, itemId, setRequest,
    setResponse, setErrors, pathname, setUpdated, comment, setEditingMode } = options;
  const token = getTokenFromLocalStorage();

  if (commentValidator(commentInput).valid) {
    setRequest(true);
    const sanitizedData = {
      comment: commentValidator(commentInput).sanitized,
      userId,
      id: itemId,
      commentId: comment._id
    };
    fetch(`${envURL}${pathname}/comment/${comment._id}`, {
      method: "PUT",
      headers: {
        'Authorization': `JWT ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(sanitizedData),
    })
      .then((res) => {
        return res.json()
          .then(jsonRes => {
            return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
          });
      })
      .then(setResponse)
      .then(() => setRequest(false))
      .then(() => setUpdated(Math.random()))
      .then(() => setEditingMode(false))
      .then(() => clearCommentInput())
      .catch(console.error);
  } else {
    setErrors(commentValidator(commentInput).errors);
  }
}
/**
* @function deleteComment sends the new comment to the server.
* @param options:object containing the other parameters
* @param {*} commentInput: string longer than 3 characters.
* @param {*} itemId :string the uid of the item subject to the comment.
* @param {*} setRequest :function useState(object:{message:string, successful:boolean, link:url})
* @param {*} setResponse :function useState(object:{message:string, successful:boolean, link:url})
* @param {*} setErrors :function useState(errors:array)
*  @param pathname:string -- a URI
*/
const deleteComment = (options) => {
  const { userId, itemId, setRequest,
    setResponse, pathname, setUpdated, comment, setEditingMode } = options;
  const token = getTokenFromLocalStorage();
  setRequest(true);
  const sanitizedData = {
    userId,
    id: itemId,
    commentId: comment._id
  };
  fetch(`${envURL}${pathname}/comment/${comment._id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `JWT ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(sanitizedData),
  })
    .then((res) => {
      return res.json()
        .then(jsonRes => {
          return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
        });
    })
    .then(setResponse)
    .then(() => setRequest(false))
    .then(() => setUpdated(Math.random()))
    .then(() => setEditingMode(false))
    .then(() => clearCommentInput())
    .catch(console.error);

}

export { saveComment, editComment, clearCommentInput, deleteComment };