import PropTypes from "prop-types";
import React, { useEffect } from 'react'
import './DefaultShareModal.scss'

 const   DefaultShareModal=({infoToShare}) =>{
   const currentURL = 'https://waldomilanes.com';

  function copyLinkToClipboard() {
    const copyText = document.getElementById("pen-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    
  }

  useEffect(() => {
  
    const shareDialog = document.querySelector('.share-dialog');
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      shareDialog.classList.remove('is-open');
    });
  
  }, [])

    return (
      <div className="share-modal-wrapper">
        <div className="share-dialog">
          <header>
            <h3 className="dialog-title">Share</h3>
            <button type='button' className="close-button"><svg><use href="#close" /></svg></button>
          </header>
          <div className="targets">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}${infoToShare.url}#${infoToShare.hash}`} target='_blank' rel="noreferrer" className="button">
              <svg>
                <use href="#facebook" />
              </svg>
              <span>Facebook</span>
            </a>
    
            <a href={`https://twitter.com/share?text=${infoToShare.title}&url=${currentURL}${infoToShare.url}`} target='_blank' rel="noreferrer" className="button">
              <svg>
                <use href="#twitter" />
              </svg>
              <span>Twitter</span>
            </a>
    
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}${infoToShare.url}`} 
              target='_blank'
              rel="noreferrer"
              className="button"
            >
              <svg>
                <use href="#linkedin" />
              </svg>
              <span>LinkedIn</span>
            </a>
    
            <a
              href={`mailto:?subject=${infoToShare.title}&body=${infoToShare.description.slice(0,200)}...%0D%0A%0D%0A Find it at ${currentURL}${infoToShare.url}.`} 
              target='_blank'
              rel="noreferrer"
              className="button"
            >
              <svg>
                <use href="#email" />
              </svg>
              <span>Email</span>
            </a>
          </div>
          <div className="link">
            <input type="text" id='pen-url' className="pen-url" value={`${currentURL}${infoToShare.url}`} />
            <button type='button' className="copy-link" onClick={copyLinkToClipboard}>Copy Link</button>
          </div>
        </div>


        <svg className="hidden">
          <defs>
    
            <symbol id="facebook" viewBox="0 0 24 24" fill="#3b5998" stroke="#3b5998" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></symbol>
    
            <symbol id="twitter" viewBox="0 0 24 24" fill="#1da1f2" stroke="#1da1f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></symbol>
    
            <symbol id="email" viewBox="0 0 24 24" fill="#777" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></symbol>
    
            <symbol id="linkedin" viewBox="0 0 24 24" fill="#0077B5" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></symbol>
    
            <symbol id="close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></symbol>
          </defs>
        </svg>
      </div>
    )
}

DefaultShareModal.propTypes = {
  infoToShare: PropTypes.shape(
    { 
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,

      }
      ).isRequired,
}

export default DefaultShareModal