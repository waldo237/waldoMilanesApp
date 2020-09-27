/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../store/store';
import { editComment } from './commentBoxFunctions';

const SaveChangesBtn = ({ options, comment, requestStarted }) => {
  const [state] = useContext(Context);
  const { Trans } = state;
  if (requestStarted) {
    return <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />;
  }

  return (
    <button onClick={() => editComment({ ...options, comment })} type="button" className="editing-btn">

      <Trans i18nKey='commentBox.save'>save</Trans>
    </button>
  );
};

SaveChangesBtn.propTypes = {
  comment: PropTypes.shape({
    comment: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  options: PropTypes.object.isRequired,
  requestStarted: PropTypes.bool.isRequired
}

export default SaveChangesBtn;