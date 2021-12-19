import React from 'react';
import Chambre from '../Chombre/Chambre'
import './Etage.css';


const Etage=(props) =>{
     
    const ChombreComponent = props.chambers.map((idChambre,i) =>{
        
        
        return (
        <Chambre className='chambre'
             key={i} 
             idChambre={props.chambers[i].idChambre }
             serie={props.chambers[i].serie }
             dispo={props.chambers[i].dispo }
             disableModifier={props.disableModifier}
          />
        ); 
    })
    return (
        <div className='CompEtage'>
            <h3 className='numEtage'>Eatge : {props.idEtage}</h3>
             <div className='Etage'>
                 {ChombreComponent}
             </div>
        </div>
    );
}
export default Etage;