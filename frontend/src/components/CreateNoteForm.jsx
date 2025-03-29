import React from 'react'
import { useState } from 'react'
import close from '../assets/close.png';

function CreateNoteForm({message, setMessage, setIsCreateButtonClicked}) {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [priority, setPriority] = useState("")
  

    const handleCreateNote = async (e) =>{
        e.preventDefault();
    
        const date = new Date().toJSON()
    
        const noteData = {
          title,
          content,
          priority,
          date
        };
    
        const token = sessionStorage.getItem('user')
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
            throw new Error(e);
          }
    
          setMessage('Notatka dodana pomyślnie!');
          
          setTitle('');
          setContent('');
          setPriority(1);
    
        } catch (error) {
          console.error('Błąd:', error);
          setMessage('Wystąpił błąd podczas dodawania notatki.');
        }
      };
    
      
    
  return (
    <div>
         <form onSubmit={handleCreateNote} className="flex flex-col gap-2">
        <img src={close} style={{width: "50px", height: "50px"}} onClick={() => setIsCreateButtonClicked(false)}/>
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
      {message}
    </div>
    
  )
}

export default CreateNoteForm