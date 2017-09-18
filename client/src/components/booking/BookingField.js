import React from 'react';

import './Booking.css';

export default ({ input }) => {
  return (
    <div>
    {/* pass entire prop with all key/values inside*/}
      <input {...input} placeholder='enter a city' className='booking_input_text' required/>
    </div>
  )
}
