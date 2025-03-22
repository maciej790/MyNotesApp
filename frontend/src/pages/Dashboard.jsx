import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = ({setUserToken}) => {

  const [notes, setNotes] = useState();
  const [messageError, setMessageError] = useState();

  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('user');
    setUserToken(null);
    navigate("/signin");
  }

  const getAllNotes = () =>{
    const token = localStorage.getItem('user');
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
      setMessageError( `Wystąpił błąd: ${error}`)
    });

  }

  useEffect(() =>{
    getAllNotes();
  }, [notes])

  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
      {messageError ? messageError : null}
      {notes ?  <ul>
        {notes.map(note => (
          <li key={note.id} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p><strong>Priorytet:</strong> {note.priority}</p>
          </li>
        ))}
      </ul> : "brak notatek do wyświetlenia"}
    </div>
  )
}

export default Dashboard