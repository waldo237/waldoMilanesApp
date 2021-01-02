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
        title="Waldo Milanes's blog | Web portfolio | Tutorials about Web Development" 
        description="I am Waldo Milanes: an enthusiastic and skilled computer programmer with knowledge and experience in building efficient web applications. Since software development is my passion, I spend time exploring new technologies and sharing my experience, strategies, and any possible hurdles I face."
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
