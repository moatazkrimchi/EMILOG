import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from '../style/sidbar.module.css'
import GroupIcon from '@material-ui/icons/Group';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

 
export default class sidbar extends Component {
    
    render() {
        return (
       
                  <div className={styles.sidbar} >
                           <Link className={styles.lnks} to="/etudiant">  <GroupIcon className={styles.icon} /> etudiants </Link> <br/>
                           {/* <Link className={styles.lnks} to="/addbatiment" > <HotelIcon className={styles.icon} />  logement </Link> <br/> */}
                           <Link className={styles.lnks} to="/liberer" > <PlaylistAddCheckIcon  className={styles.icon} />  Affectation </Link><br/>
                           <Link className={styles.lnks} to="/addbatiment" > <EventNoteIcon className={styles.icon} />   Batiment </Link>   <br/>
                  </div>
        
        )
    }
}


