import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = ({setUserToken}) => {

  const [notes, setNotes] = useState();
  const [messageError, setMessageError] = useState();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [priority, setPriority] = useState("")

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

  const handleCreateNote = async (e) =>{
    e.preventDefault();

    const date = new Date().toJSON()

    const noteData = {
      title,
      content,
      priority,
      date
    };

    const token = localStorage.getItem('user')
    const url = 'http://localhost:3000/notes/create';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
      });

      if (!response.ok) {
        throw new Error('Błąd podczas dodawania notatki');
      }

      const result = await response.json();
      setMessage('Notatka dodana pomyślnie!');
      console.log('Sukces:', result);
      
      // Opcjonalnie: Możesz dodać resetowanie formularza
      setTitle('');
      setContent('');
      setPriority(1);

    } catch (error) {
      console.error('Błąd:', error);
      setMessage('Wystąpił błąd podczas dodawania notatki.');
    }
  };

  

  useEffect(() =>{
    getAllNotes();
  }, [notes])

  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleCreateNote} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Stwórz notatkę
        </button>
      </form>
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