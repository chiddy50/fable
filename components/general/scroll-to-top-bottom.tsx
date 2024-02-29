"use client"

import { useState, useEffect } from 'react';

function ScrollToTopBottom() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    if (document !== 'undefined' && window !== 'undefined') {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  function scrollToBottom() {
    if (document !== 'undefined' && window !== 'undefined') {
      
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  

  return (
    <>
      {showButton && (
        <div className="flex flex-col items-center justify-center fixed scroll-control show gap-3">
          <button className="scroll-to-top-button flex items-center rounded-xl p-2 justify-center text-white bg-gray-800 w-full h-full" onClick={scrollToTop}>
            <i className='bx bxs-chevron-up text-xl'></i>
          </button>
          <button className="scroll-to-bottom-button flex items-center rounded-xl p-2 justify-center text-white bg-gray-800 w-full h-full" onClick={scrollToBottom}>
            <i className='bx bxs-chevron-down text-xl'></i>
          </button>
        </div>
      )}
    </>
  );
}

export default ScrollToTopBottom;