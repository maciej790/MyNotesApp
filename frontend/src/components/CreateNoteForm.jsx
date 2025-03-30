import React from 'react'
import { useState } from 'react'
import close from '../assets/close.png';
import "../styles/CreareNoteForm.scss"

function CreateNoteForm({ message, setMessage, setIsCreateButtonClicked }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("1");

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const date = new Date().toJSON();
    const noteData = { title, content, priority, date };
    const token = sessionStorage.getItem("user");
    const url = "http://localhost:3000/notes/create";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) throw new Error(e);

      setMessage("✅ Notatka dodana pomyślnie!");
      setTitle("");
      setContent("");
      setPriority("1");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Błąd:", error);
      setMessage("❌ Taka notatka już istnieje!");
    }
  };

  return (
    <div className="createNoteForm__overlay">
      <div className="createNoteForm">
        <img
          src={close}
          className="createNoteForm__close"
          onClick={() => setIsCreateButtonClicked(false)}
          alt="Close"
        />
        <form onSubmit={handleCreateNote}>
          <div>
            <label htmlFor="title">Tytuł notatki</label>
            <input
              id="title"
              type="text"
              placeholder="Wpisz tytuł..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Treść</label>
            <textarea
              id="content"
              placeholder="Dodaj treść..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="priority">Priorytet</label>
            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
              <option value="1">🟢 Niski Priorytet</option>
              <option value="2">🟠 Średni Priorytet</option>
              <option value="3">🔴 Wysoki Priorytet</option>
            </select>
          </div>
          <button type="submit">➕ Stwórz notatkę</button>
        </form>
        {message && <p className="createNoteForm__message">{message}</p>}
      </div>
    </div>
  );
}


export default CreateNoteForm