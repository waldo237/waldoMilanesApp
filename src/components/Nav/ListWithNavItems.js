
import React from 'react';
import PropsType from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';

const ListWithNavItems = ({ item, openInnerList, isLoggedIn }) => {
  if (item && item.children) {
    return (
      <li>
        <div
          id="with-children"
          className="nav-item-with-children"
        >
          <span
            className="nav-item-with-children-span"
            onClick={openInnerList}
            onKeyDown={openInnerList}
          >
            {item.title}
            <FontAwesomeIcon className=" drop-icon" icon={faChevronDown} />
          </span>
          {!item.icon
            ? (
              <ul className="inner-nav-item-list">
                {item.children.map((child) => (
                  <Link
                    activeClassName="active-route"
                    exact="true"
                    to={child.link}
                    key={child.title}
                  >
                    <button type="button" className="btn spacious">
                      {!item.icon ? (
                        <FontAwesomeIcon className="fa-lg" icon={child.icon} />
                      ) : null}{" "}
                      {child.title}
                    </button>
                  </Link>
                ))}
              </ul>
            ) : null}
        </div>
      </li>
    );
  }
  const specialCondition = item.title === 'settings' || item.link === "/followers";
  if (item) {
    if (specialCondition && isLoggedIn) return null;
    if (item.title === 'settings' && !isLoggedIn) return null;
    return (
      <li>
        <Link activeClassName="active-route" exact="true" to={item.link}>
          <button type="button" className="btn spacious">
            {item.title}
          </button>
        </Link>
      </li>
    )
  }
}

ListWithNavItems.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropsType.object,
  openInnerList: PropsType.func.isRequired,
  isLoggedIn: PropsType.bool,
}
ListWithNavItems.defaultProps = {
  item: null
}
export default ListWithNavItems;