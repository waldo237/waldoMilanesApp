import React, { useEffect, useState, useContext } from "react";
import { Link } from "gatsby";
import "./Nav.scss";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { Context } from '../../store/store'
import bannerImg from "../../static/banner.png";
import Settings from '../Dashboard/Settings';
import Dashboard from '../Dashboard/Dashboard';
import {ClickAwayCloser, removeDisplayNone} from './ClickAwayCloser'
import ListWithNavItems from "./ListWithNavItems";
import { uuidv4 } from '../gobalUtil'
import SettingBtn from "./SettingBtn";
import AvatarContainer from "./AvatarContainer";

const Navigation = () => {
  const [state] = useContext(Context);
  const [showSideMenu, toggleSideMenu] = useState(false);
  const { Trans } = state;
  const navItems = [
    { id: uuidv4(), title: <Trans i18nKey="nav.home">Home</Trans>, link: "/" },
    {
      id: uuidv4(),
      title: <Trans i18nKey="nav.myWork">My Work</Trans>,
      link: "/portfolio",
      children: [
        { id: uuidv4(), title: "Node", link: "/project/node", icon: faNodeJs },
        { id: uuidv4(), title: "Java", link: "/project/java", icon: faJava },
        { id: uuidv4(), title: "Vue", link: "/project/vue", icon: faVuejs },
        { id: uuidv4(), title: "React", link: "/project/react", icon: faReact },
      ],
    },
    { id: uuidv4(), title: <Trans i18nKey="nav.articles">Articles</Trans>, link: "/articles" },
    { id: uuidv4(), title: <Trans i18nKey="nav.Contacts">Contacts</Trans>, link: "/contacts" },
    { id: uuidv4(), title: <Trans i18nKey="nav.followers">followers</Trans>, link: "/followers" },
    { id: uuidv4(), title: "settings", link: '/' },
  ];

  const triggerToggleSideMenu = (value) => {
    const container = document.querySelector('.nav-items-container');
    if (!value && container) {
      const timer = setTimeout(() => {
        toggleSideMenu(value)
      }, 300);
      container.style.animation = ' slideOutRightx 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)';
      return () => clearTimeout(timer);
    }

    return toggleSideMenu(value);
  }

  // turn icon .rotate and .closable
  const openInnerList = () => {
    const icon = document.querySelector(".drop-icon");
    const innerItems = document.querySelector(".inner-nav-item-list");
    icon.classList.toggle("rotate");
    innerItems.classList.toggle("closable");
  };

 


  useEffect(() => {
    const nav = document.getElementById("navbar");
    const navOriginalPositioin = nav.offsetTop;
    const makeNavSticky = () => {
      if (window.pageYOffset > navOriginalPositioin) {
        nav.classList.add("sticky");
        nav.classList.remove("stuck");
      } else {
        nav.classList.remove("sticky");
        nav.classList.add("stuck");
      }
    };
    window.onscroll = () => makeNavSticky();

    const activateSideNav = () => {
      if (document.body.clientWidth >= 800) {
        toggleSideMenu(true);
      } else {
        toggleSideMenu(false);
      }
    };
    activateSideNav();
    window.addEventListener("resize", activateSideNav);

    // make the nav colapse if click away.
    document.addEventListener("click", (evt) => {
      if (document.body.clientWidth <= 800) {
        const navElem = document.getElementById("nav");
        const innerNav = document.querySelector(".nav-item-with-children-span");
        let targetElement = evt.target;
        do {
          if (
            targetElement === navElem ||
            targetElement === innerNav
          ) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        triggerToggleSideMenu(false);
      }
    });
  }, [])

  return (
    <nav id="navbar" className="primary shadow stuck">
      <Link to="/" className="social-link link">
        <img
          src={bannerImg}
          alt="W Programming icon"
          className="small-w-programming-img"
        />
      </Link>

      <div className="mid primary" id="nav">
        <div
          onClick={() => triggerToggleSideMenu(!showSideMenu)}
          onKeyDown={() => triggerToggleSideMenu(!showSideMenu)}
          className={showSideMenu ? 'menu-btn open' : 'menu-btn'}
        >
          <div className="menu-btn__burger" />
        </div>
      </div>

      {showSideMenu
        ? (
          <div className="nav-items-main-wrapper">
            <div className="nav-items-container  primary">
    
              <ul className="nav-items-list" id="nav-items-list">
                {navItems.map((navItem) => (
                  
                  <div key={navItem.id}>
                    <AvatarContainer navItem={navItem} state={state} removeDisplayNone={removeDisplayNone} />
                    <ListWithNavItems item={navItem} openInnerList={openInnerList} isLoggedIn={state.isLoggedIn} />
                    <SettingBtn navItem={navItem} isLoggedIn={state.isLoggedIn} removeDisplayNone={removeDisplayNone} /> 

                  </div>
               
                )
                )}

              </ul>
            </div>
          </div>
        )
        : null}


      {(state.isLoggedIn)
        ? (
          <ClickAwayCloser exceptionById='avatar-wrapper'> 
            <Dashboard removeDisplayNone={removeDisplayNone} /> 
          </ClickAwayCloser>
)
        : null}
      <ClickAwayCloser exceptionById='setting-btn'> 
        <Settings /> 
      </ClickAwayCloser>
    </nav>
  );
}

export default Navigation;
