import PropTypes from "prop-types";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSortAmountDownAlt, faSortAmountUpAlt } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../store/store";

const Filter = ({ itemType, setDisplayableArray, items }) => {
  const [state] = useContext(Context);
  const { Trans } = state;

  const inputHandler = (event) => {
    const filteredArr = items.filter((item) => item
      .title
      .toLowerCase()
      .includes(event.target.value.toLowerCase()));

    setDisplayableArray(filteredArr);
  };
  const sortHandler = (event, direction) => {

    const sortedArr = items.sort((a, b) =>(direction ==="DESC")
    ? new Date(b.date) - new Date(a.date)
    :new Date(a.date) - new Date(b.date))
    setDisplayableArray([...sortedArr]);
  };
  return (
    <div className='filter'>
      <input
        id="filter"
        className="form-control"
        type="text"
        onKeyDown={inputHandler}
      />
      <div className='lower-row'>
        <label htmlFor="filter">
          <FontAwesomeIcon icon={faSearch} /> <Trans i18nKey='filter.search'>search {" "} </Trans>{itemType}
        </label>
      
        <FontAwesomeIcon className="sorting-btn" icon={faSortAmountDownAlt} name="ASC" onClick={(e)=> sortHandler(e,"ASC")} onKeyDown={(e)=> sortHandler(e,"ASC")} />
        <FontAwesomeIcon className="sorting-btn" icon={faSortAmountUpAlt} name="DESC" onClick={(e)=> sortHandler(e,"DESC")} onKeyDown={(e)=> sortHandler(e,"DESC")} />
       
      </div>
    </div>
  );
};
Filter.propTypes = {
  itemType: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  setDisplayableArray: PropTypes.func
};


export default Filter