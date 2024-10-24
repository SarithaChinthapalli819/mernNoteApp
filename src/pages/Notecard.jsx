import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Notecard({item,editNote,deleteNoteModel}) {
  return (
    <div className='noteCard'>
      <h4>{item.title}</h4>
      <div>{item.description}</div>
      <button className='editIcon' onClick={()=>editNote(item)}><FaEdit/></button>
      <button className='deleteIcon' onClick={()=>deleteNoteModel(true,item._id)}><FaTrash/></button>
    </div>
  );
}
