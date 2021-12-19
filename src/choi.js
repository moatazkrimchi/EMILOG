import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function choi(props) {
    return (
        <div className="increase" >
            <label htmlFor=""> {props.nom}  </label> 
            <button className="controle" ><ExpandLessIcon fontSize="small" /></button>
            <button className="controle" ><ExpandMoreIcon fontSize="small" /></button>
        </div>
    )
}
