import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import CreateNoteForm from '../components/CreateNoteForm';
import NoteCard from '../components/NoteCard';
import '../styles/Dashboard.scss';
import FilterNotes from '../components/FilterNotes';

const Dashboard = ({ setUserToken }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUserToken(null);
    navigate('/signin');
  };

  const getAllNotes = () => {
    const token = sessionStorage.getItem('user');
    const url = 'http://localhost:3000/notes/';

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setNotes(data);
        setFilteredNotes(data); // Domyślnie wszystkie notatki są widoczne
      })
      .catch(error => {
        setMessage(`Wystąpił błąd: ${error}`);
      });
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="dashboard">
      <SideBar setIsCreateButtonClicked={setIsCreateButtonClicked} handleLogout={handleLogout} />
      {isCreateButtonClicked ? <CreateNoteForm message={message} setMessage={setMessage} setIsCreateButtonClicked={setIsCreateButtonClicked} /> : null}
      <FilterNotes setFilteredNotes={setFilteredNotes} notes={notes} />
      {message ? message : null}

      {filteredNotes.length > 0 ? (
        filteredNotes.map(note => <NoteCard key={note.id} note={note} />)
      ) : (
        <p>Brak notatek spełniających wybrane kryteria.</p>
      )}
    </div>
  );
};

export default Dashboard;
