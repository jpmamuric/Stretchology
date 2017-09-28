import React from 'react';

import './Contractor.css'

const ContractorItem = ({ name, address, session, status, _id }) => {
  return (
    <div key={_id} className='card_item'>
      <h3>{name}</h3>
      <div>{address}</div>
      <div>Session: {session}</div>
      <div>Status: <span className='card_status'>{status}</span></div>
      <div className='card_btn '>Confirm</div>
    </div>
  )
}

export default ContractorItem
