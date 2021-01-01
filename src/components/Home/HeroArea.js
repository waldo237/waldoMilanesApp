import React, { useContext } from "react";
import { DBShape, SecurityShape, ServerShape, StackShape, CodeShape } from './Shapes'
import { Context } from '../../store/store'

const HeroArea = () => {
  const [state] = useContext(Context);
  const { Trans, t } = state;

  return (
    <>
      <div id="hero-title-wrapper" className='primary--text fadeInUpx'>
        <h2 id="pragmatic-dedicated"><Trans t={t} i18nKey="home.aPracmatic">A Pragmatic and Dedicated</Trans> </h2>
        <h1 id="web-developer"><Trans t={t} i18nKey="home.developer">Web Developer</Trans></h1>
        <p id='introduction-paragraph'>
          <Trans t={t} i18nKey="home.introductionParagraph">
            Hi, my name is Waldo Milanes. I am an enthusiastic and skilled computer programmer with knowledge and experience in building efficient web applications.
          </Trans>

        </p>
        <a href="#more-about-me-container">
          <button id='hear-more-btn' type="button" className="my-work-btn my-work-btn-wide primary--text">
            <Trans t={t} i18nKey="home.hearMore">
              Hear more
            </Trans>
          </button>
        </a>
      </div>


      <div className="main-shape-wrapper flex-row fadeInUpx">
        <div className='shapes flex-row'>
          <div className='shapes-lower-left '>
            <SecurityShape />
            <CodeShape />
          </div>
          <div className='stacks flex-column'>

            <div className="wm-img shadow" />
            <StackShape />
          </div>
          <div className='shapes-upper-right'>
            <DBShape />
            <ServerShape />
          </div>
        </div>
      </div>
    </>

  );
};
export default HeroArea