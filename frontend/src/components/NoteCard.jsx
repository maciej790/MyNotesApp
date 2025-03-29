import '../styles/NoteCard.scss'
import bin from '../assets/bin.png';

function NoteCard({note}) {

    let priorityColor = null;

    if(note.priority === 1){
        priorityColor = 'green';
    }else if(note.priority === 2){
        priorityColor = 'orange';
    }else{
       priorityColor = 'red';
    }

  return (
    <div className='noteCard'>
        <div className="noteCard__top">
            <div className="noteCard__top--left">
                <div className="noteCard__title--title">
                    <h3>
                    {note.title}
                    </h3>
                </div>
            </div>
            <div className="noteCard__top--right">
                <div className={`noteCard__top__priority--${priorityColor}`}></div>
                    <div className="noteCard__top__delete">
                        <img src={bin} style={{width: "100%", height: "100%"}} />
                    </div>
            </div>
        </div>
        <div className="noteCard__bottom">
                {note.content}
        </div>
    </div>
  )
}

export default NoteCard