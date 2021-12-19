import React from 'react';
import Batiment from '../Batiment/Batiment';


const Batiments=(  { batimentData , disableModifier} ) =>{
     
    const batimentComponent = batimentData.map((nomBatiment,i) =>{
        return (
        <Batiment
             key={i} 
             nomBatiment={batimentData[i].nomBatiment}
             type={batimentData[i].type}
             Etages={batimentData[i].Etages}
             disableModifier={disableModifier}
          />
        ); 
    })
    
    return (
        <div className='CompBatS'>
             <div className='BatimentS'>
                 {batimentComponent}
             </div>
        </div>
    );
}
export default Batiments;