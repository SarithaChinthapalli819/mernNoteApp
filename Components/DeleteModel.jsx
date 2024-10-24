import React from 'react';

export default function DeleteModel({isDeleteNote}) {
  return (
    <div className='notemodal-backdrop'>
      <div className="notemodal-content" style={{width:"300px"}}>
        <h4>Are You Sure To Delete?</h4>
        <div className='text-center mt-4'>
            <button className='btn btn-success deleteYesButton' onClick={()=>isDeleteNote(true)}>Yes</button>
            <button className='btn btn-danger' onClick={()=>isDeleteNote(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
