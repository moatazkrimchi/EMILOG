import React from 'react'
import '../style/liberer.css'

export default function liberationD(props) {
    return (
        <div>
            <div className="container" >
                <div className="left" >
                        <p> <img src={props.profile} alt=""/></p>
                        <p className="infos" > 
                             <p> <strong> Nom : </strong>{props.name}</p>
                             <p id="tel"  ><strong> Tel : </strong>{props.tel}</p>
                             <p> <strong> Matr : </strong> {props.matr}</p>
                        </p>
                </div>
            <div className="right" > 
                  <button>Liberer</button>
                  <button className="accederp">Acceder Profile</button>
            </div>
            </div>
        </div>
    )
}
