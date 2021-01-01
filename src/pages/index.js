import React, {  useContext } from "react";
import "./index.scss";
import { Link } from "gatsby";
import Tecnologies from '../components/Home/Technologies';
import {FishFlock, FishFlock2} from "../components/Home/FishFlock";
import Education from "../components/Home/Education";
import HeroArea from "../components/Home/HeroArea";
import MoreAboutMe from "../components/Home/MoreAboutMe";
import { Context } from "../store/store";
import SEO from "../components/seo";

const Home = () => {
 const [state]= useContext(Context);
 const {Trans} = state;

  return (
    <>
      <SEO 
        title="My professional profile | Web Developer" 
        description="I know how to efficiently create elegant and user-friendly interfaces, customized back-end databases, and proper optimization to meet up-to-date security standards. My experience in educational management has given me the opportunity to help small teams foster cooperation for excellent results. I excel particularly at communicating my ideas respectfully and negotiating differences with my colleagues."
      />
      <main className="hero-area-wrapper light">
        <div className='elipsis-shape' />
        <HeroArea  />
      </main>
      <MoreAboutMe />
      <article className="light">
        <div id="my-work-container">
          <Link to="/portfolio">
            <button type="button" className="my-work-btn light--text">
              <Trans i18nKey="home.myWorkBtn">my work</Trans>
            </button>
          </Link>
        
          <Tecnologies />

          <div className='fish-animation'>
            {/* <FishFlock  />
            <FishFlock2 /> */}
          </div>
        </div>
      </article>
      <aside id="education">
        <Education />
      </aside>
    </>
  );
};



export default Home;
