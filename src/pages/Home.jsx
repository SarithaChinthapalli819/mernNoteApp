import React, { useContext, useEffect, useState } from 'react';
import Navigate from '../../Components/Navigate';
import Notemodel from '../../Components/Notemodel';
import axios from 'axios';
import Notecard from './Notecard';
import DeleteModel from '../../Components/DeleteModel';
import { toast } from 'react-toastify';
import logintemplate from '../assets/logintemplate.avif'
import { context } from '../App';

export default function Home() {
  const [openModel,setModel]=useState(false)
  const [opendeleteModel,setDeleteModel]=useState(false)
  const [deleteId,setDeleteId]=useState()
  const [currentNote,setCurrentNote]=useState()
  const { user } = useContext(context)
  const onsetModel=(value)=>{
    setModel(value)
  }

  const [notes,setNotes]=useState([])
  const [filteredNotes,setFilteredNotes]=useState([])
  const [query,setQuery]=useState('')
 const fetchNotes=async ()=>{
    const {data}=await axios.get('http://localhost:5000/api/note',{headers:{
      authorization:`Bearer ${localStorage.getItem("token")}`
    }})
    setNotes(data.notes)
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  useEffect(() => {
    console.log(query)
    const filteredNotes=notes.filter((item)=>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) 
    )
    console.log(filteredNotes)
    setFilteredNotes(filteredNotes)
  }, [notes,query]);

  const AddNote= async (title,description)=>{
    const response =await axios.post('http://localhost:5000/api/note/add',
      {title,description},
      {headers:{
        authorization:`Bearer ${localStorage.getItem("token")}`
      }}
    )
    if(response.data.success){
      fetchNotes()
      setModel(false)
      toast.success('Note added successfully!');
    }
  }

  const editNote= (value)=>{
    setCurrentNote(value)
    setModel(true)
  }

  const deleteNoteModel= (value,id)=>{
    setDeleteId(id)
    setDeleteModel(value)
  }
   
  const isDeleteNote= (value)=>{
    if(value){
      deleteNote()
    }
    else{
      setDeleteModel(false)
    }
  }

  const deleteNote =async ()=>{
    const response =await axios.delete(`http://localhost:5000/api/note/${deleteId}`,
      {headers:{
        authorization:`Bearer ${localStorage.getItem("token")}`
      }}
    )
    if(response.data.success){
      fetchNotes()
      setDeleteModel(false)
      toast.success('Note deleted successfully!');
    }
  }

  const updateNote=async(title,description,id)=>{
    const response =await axios.put(`http://localhost:5000/api/note/${id}`,
      {title,description},
      {headers:{
        authorization:`Bearer ${localStorage.getItem("token")}`
      }}
    )
    if(response.data.success){
      fetchNotes()
      setModel(false)
      toast.success('Note updated successfully!');
    }
  }

  return (
    <>
      <Navigate setQuery={setQuery}/>
      {user ?
      <div className='d-flex flex-lg-wrap'>{
       filteredNotes ? filteredNotes.map((item)=>(<Notecard item={item} editNote={editNote} deleteNoteModel={deleteNoteModel}/>)) :'No Notes Found'
      }</div> : <div className='imageDiv'><div><div className='imageText'>Please Login Before You Proceed Forward</div><img src={logintemplate} width="400px" height="400px"/></div></div>}
       <button className='btn btn-primary add-button' onClick={()=>{onsetModel(true);setCurrentNote(null)}}> + </button>
      {openModel && <Notemodel onsetModel={onsetModel} AddNote={AddNote} currentNote={currentNote} updateNote={updateNote}/> }
      {opendeleteModel && <DeleteModel deleteNoteModel={deleteNoteModel} isDeleteNote={isDeleteNote} />}
    </>
  );
}
