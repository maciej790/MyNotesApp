import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SideBar from '../components/SideBar';
import CreateNoteForm from '../components/CreateNoteForm';
import NoteCard from '../components/NoteCard';
import '../styles/Dashboard.scss'

const Dashboard = ({setUserToken}) => {

  const [notes, setNotes] = useState();
  const [message, setMessage] = useState();
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () =>{
    sessionStorage.removeItem('user');
    setUserToken(null);
    navigate("/signin");
  }

  const getAllNotes = () =>{
    const token = sessionStorage.getItem('user');
    const url = 'http://localhost:3000/notes/';

    fetch(url, {
      method: 'GET', // lub POST, PUT, DELETE w zależności od typu żądania
      headers: {
        'Authorization': `Bearer ${token}`, // Dodaj JWT token w nagłówku Authorization
        'Content-Type': 'application/json'  // Określenie typu danych (opcjonalne, zależnie od API)
      }
    })
    .then(response => response.json()) // Oczekuj na odpowiedź w formacie JSON
    .then(data => {
      setNotes(data)
    })
    .catch(error => {
      setMessage( `Wystąpił błąd: ${error}`)
    });

  }

  useEffect(() =>{
    getAllNotes();
  }, [])

  return (
    <div className='dashboard'>
      <SideBar setIsCreateButtonClicked={setIsCreateButtonClicked} handleLogout={handleLogout}/>
      {isCreateButtonClicked ? <CreateNoteForm message={message} setMessage={setMessage} setIsCreateButtonClicked={setIsCreateButtonClicked}/> : null}
      
      {message ? message : null}

      {notes ?      
        notes.map(note => (
          <NoteCard key={note.id}  note={note}/>
        ))
       : "brak notatek do wyświetlenia"}
    </div>
  )
}

export default Dashboard