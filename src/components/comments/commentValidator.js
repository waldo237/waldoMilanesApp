
import escape from "validator/es/lib/escape";

const commentValidator = (comment) => {
  console.log(comment)
  const res = {
    valid: true,
    errors: [],
  };

  if (!comment) {
    res.errors.push({
      type: "comment",
      message: "Please do not forget to include the comment.",
    });
    res.valid = false;
  } else if (comment.length < 5) {
    res.errors.push({
      type: "comment",
      message: "The comment should be longer than 5 characters.",
    });
    res.valid = false;
  }

  
  if (res.valid) {
    res.sanitized = escape(comment.trim())
  }

  return res;
};

export default commentValidator;
