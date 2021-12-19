import React from 'react';
import Etage from '../Etage/Etage'
import './batiment.css';


const Batiment=(props) =>{
     
    const etageComponent =props.Etages.map((idEtage,i) =>{
        return (
        <Etage 
             key={i} 
             idEtage={props.Etages[i].idEtage}
             chambers={props.Etages[i].chambers}
             disableModifier={props.disableModifier}
          />
        ); 
    })
    
    return (
        <div className='CompBat'>
            <h3 className='nomBat'>Batiment : {props.nomBatiment}</h3>
            
             <div className='Batiment'>
                 {etageComponent}
             </div>
             <div className='espace'></div>
        </div>
    );
}
export default Batiment;


//<h3 className='typrBat'>Type : {props.type}</h3>