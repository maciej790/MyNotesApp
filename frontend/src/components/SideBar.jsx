import React from 'react'
import '../styles/SideBar.scss';
import add from '../assets/add.png';
import right from '../assets/right.png'

function SideBar({setIsCreateButtonClicked, handleLogout}) {
  return (
    <nav className='sideBar'>
        <div className="sideBar__icon--create" onClick={() => setIsCreateButtonClicked(true)}>
            <img src={add} style={{width: "100%", height: "100%", }}/>
        </div>
        <div className="sideBar__logo">
            <h1>MyNotesApp</h1>
        </div>
        <div className="sideBar__icon--signout" onClick={handleLogout}>
            <img src={right} style={{width: "100%", height: "100%", }}/>
        </div>
    </nav>
  )
}

export default SideBar