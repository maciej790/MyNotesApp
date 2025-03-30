import "../styles/NoteCard.scss";
import bin from "../assets/bin.png";
import edit from "../assets/edit.png";

function NoteCard({ note }) {
  let priorityClass = "priority-red"; // Domyślnie czerwony

  if (note.priority === 1) {
    priorityClass = "priority-green";
  } else if (note.priority === 2) {
    priorityClass = "priority-orange";
  }

  // Formatowanie daty na czytelniejszy format
  const formattedDate = new Date(note.created_at).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`noteCard ${priorityClass}`}>
      <div className="noteCard__header">
        <div className="noteCard__edit">
          <img src={edit} alt="Edit" />
        </div>
        <h3 className="noteCard__title">{note.title}</h3>
        <div className="noteCard__delete">
          <img src={bin} alt="Delete" />
        </div>
      </div>
      <div className="noteCard__content">
        <p className="noteCard__text">{note.content}</p>
        <span className="noteCard__date">📅 {formattedDate}</span>
      </div>
    </div>
  );
}

export default NoteCard;
