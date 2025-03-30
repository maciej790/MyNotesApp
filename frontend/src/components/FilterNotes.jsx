import React from 'react';
import "../styles/FilterNotes.scss"

function FilterNotes({ setFilteredNotes, notes }) {

  // Funkcja do filtrowania notatek po dacie (rosnąco lub malejąco)
  const sortNotesByDate = (order) => {
    const sortedNotes = [...notes];
    sortedNotes.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === 'asc' ? dateA - dateB : dateB - dateA; // Sortowanie po dacie
    });
    setFilteredNotes(sortedNotes);
  };

  // Funkcja do filtrowania notatek po priorytecie
  const filterByPriority = (priority) => {
    const filteredNotes = notes.filter(note => note.priority === priority);
    setFilteredNotes(filteredNotes);
  };

  // Funkcja do przywrócenia wszystkich notatek (przywrócenie filtrów)
  const clearFilters = () => {
    setFilteredNotes(notes);
  };

  return (
    <div className="filterNotes">
    <h3 className='filterNotes_title'>Filtruj po dacie</h3>
      <div className="filterNotes__buttons">
        <button onClick={() => sortNotesByDate('asc')} className="filterNotes__button">
          Rosnąco
        </button>
        <button onClick={() => sortNotesByDate('desc')} className="filterNotes__button">
          Malejąco
        </button>
      </div>
      <h3 className='filterNotes_title'>Filtruj po priorytecie</h3>
      <div className="filterNotes__priorityButtons">
        <button onClick={() => filterByPriority(1)} className="filterNotes__button priority-green">
          Zielony
        </button>
        <button onClick={() => filterByPriority(2)} className="filterNotes__button priority-orange">
          Pomarańczowy
        </button>
        <button onClick={() => filterByPriority(3)} className="filterNotes__button priority-red">
          Czerwony
        </button>
      </div>

      <button onClick={clearFilters} className="filterNotes__clearButton">
        Wyczyść filtry
      </button>
    </div>
  );
}

export default FilterNotes;
