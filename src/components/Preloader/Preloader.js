import React from 'react';

const Preloader = ({isInitialLoad}) => {
  
  return (
    <div className={`preloader ${isInitialLoad ? 'preloader__initial' : ''}`}>      
      <div className='preloader__container'>
        <span className='preloader__round'></span>
      </div>
    </div>
  );
};

export default Preloader;
