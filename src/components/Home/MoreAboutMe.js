import React, { useEffect, useContext } from 'react';
import { Ability, Management, Communication } from './Shapes'
import { Context } from '../../store/store'
import { uuidv4 } from '../gobalUtil';

const MoreAboutMe = () => {
  const [state] = useContext(Context);
  const { Trans } = state;
  const paragraphs = [
    {
      id: uuidv4(),
      icon: <Ability />,
      title: <Trans i18nKey='home.technicalTitle'>technical skills</Trans>, content: <Trans i18nKey='home.technicalContent'>I know how to efficiently create customized back-end databases, elegant and user-friendly interfaces, and proper optimization to meet up-to-date security standards.</Trans>
    },
    {
      id: uuidv4(),
      icon: <Management />,
      title: <Trans i18nKey='home.managerialTitle'>managerial skills</Trans>, content: <Trans i18nKey='home.managerialContent'>I have experience helping small teams foster cooperation and motivation to deliver accurate results in record time.</Trans>
    },
    {
      id: uuidv4(),
      icon: <Communication />,
      title: <Trans i18nKey='home.attitudelTitle'>professional attitude</Trans>, content: <Trans i18nKey='home.attitudeContent'>I excel at communicating my ideas respectfully and negotiating differences with my colleagues.</Trans>
    },
  ]
  useEffect(() => {
    if (typeof window !== `undefined`) {
    const moreAboutMe = document.querySelectorAll(".lazy-effect");
    moreAboutMe.forEach((item) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) =>
          (entry.isIntersecting && !item.classList.contains('fadeInUpx')) ? item.classList.add("fadeInUpx") : ''
        );
      });
      observer.observe(item);
    }, { rootMargin: "100px" })
  }
  })
  return (
    <article id="more-about-me-container" className="light primary--text">
      <div id="more-about-me-wrapper">
        {paragraphs.map((paragraph) => (
          <div className="more-about-me-card " key={paragraph.id}>
            {paragraph.icon}
            <h2 className='lazy-effect'>{paragraph.title}</h2>
            <p className='lazy-effect'>
              {paragraph.content}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}

export default MoreAboutMe