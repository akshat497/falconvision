import React from 'react';

import { FaInfoCircle } from 'react-icons/fa';


export default function NoDatComponent() {
  return (
    <>
      
      <div className='nodata-container'>
        <div className='nodata-content'>
          <FaInfoCircle className='info-icon' />
          <h2>No Data Available</h2>
          <p>We couldn't find any data for the selected criteria.</p>
          {/* You can customize the message based on your application's context */}
        </div>
      </div>
    </>
  );
}
