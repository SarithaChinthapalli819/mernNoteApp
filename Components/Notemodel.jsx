import React, { useEffect, useState } from 'react';

export default function Notemodel({onsetModel,AddNote,currentNote,updateNote}) {
    const [addmodel,setmodel]=useState(
        {
            title:'',
            description:''
        }
    )
    useEffect(()=>{
        if(currentNote){
            setmodel({...addmodel,title:currentNote.title,description:currentNote.description})
        }
    },[currentNote])

    
    const {title,description}=addmodel
    
    const changeHandler=(e)=>{
        setmodel({...addmodel,[e.target.name]:e.target.value})
    }

    const submitHandler= (e)=>{
        e.preventDefault();
        if(currentNote){
            console.log(currentNote)
            updateNote(title,description,currentNote._id)
        }
        else{
          AddNote(title,description)
        }
    }
  return (
    <div className='notemodal-backdrop'>
    <div className="notemodal-content" >
      {currentNote ?<h4>Edit Note</h4> :<h4>Add New Note</h4>}
      <input type="text" className='form-control mb-3' placeholder='Enter title..' required name="title" value={title} onChange={(e)=>changeHandler(e)}/>
      <textarea className='form-control mb-3' placeholder="Enter Description ..." required name="description" value={description} onChange={(e)=>changeHandler(e)}>

      </textarea>
      {currentNote ? 
      <><button className='btn btn-primary mb-3' onClick={(e) => submitHandler(e)}>Update Note </button><br /></>
      :<><button className='btn btn-primary mb-3' onClick={(e) => submitHandler(e)}>Add Note </button><br /></>
      }
      <button className='btn btn-danger' onClick={()=>onsetModel(false)}> Cancel</button>
    </div>
    </div>
  );
}
