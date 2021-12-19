import React from 'react'
import style from '../style/profile.module.css'
import profile from '../images/profile.PNG'
import {useState} from 'react' 
import { useParams } from 'react-router';
import axios from 'axios'



export default function Profile() {
   const [buttonText , setButtonText ] = useState("Edit");
   const [hamou,sethamou] = useState([]);
   const {id} = useParams()
   const level = id.substr(id.length-2, id.length-1) ;

   const changeText = () => {
        if (buttonText==="Edit") {
          setButtonText("Enregistrer");
        }
        else {
          setButtonText("Edit") ;
        }
   }
   setTimeout(() => {
    const configuration = {
      headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"        
      }
      }
          axios.get("http://localhost:3307/etudiant/"+ level +"/",configuration )
          .then(res =>{
              sethamou(res.data)
          });      
  },100);

  return (
        <> 
        <div className={style.profile} >  
            <button className={style.edit} onClick={() =>changeText()}>{buttonText} </button>
            <div className={style.container} >
                <img src= {profile} alt=""/>
             </div>
           
            <div className={style.infos} >
              <div className={style.labels}>
                <label htmlFor="nom"> <strong>Nom : </strong></label>
                <label htmlFor="Prenom"><strong>Prenom :</strong> </label>
                <label htmlFor="Matricule"> <strong>Maticule</strong> </label>
                <label htmlFor="Email"> <strong>Email : </strong> </label>
                <label htmlFor="Tel"> <strong>Tel</strong> </label>
                <label htmlFor="Promotion"> <strong>Promotion : </strong> </label>
                <label htmlFor="Filiere"><strong>Filiere : </strong> </label>
                <label htmlFor="Sexe"> <strong>Sexe :</strong> </label>
                <label htmlFor="Motdepasse"> <strong>Mot de Passe </strong> </label>
                <label htmlFor="batiment"> <strong> Batiment :</strong> </label>
                <label htmlFor="Etage"> <strong> Etage :  </strong> </label>
                <label htmlFor="chambre"> <strong>Chambre : </strong> </label>
              </div>
              <div  className={style.inputs}>
                <input name="nom" type="text" placeholder={hamou[id].Nom}/>
                <input name="Prenom" type="text" value={id}  />
                <input name="Matricule" type="text" value={id}/>   
                <input name="Email" type="text" value={id}/>               
                <input name="Tel" type="text" value={id}   />   
                <input name="Promotion" type="text" value={id} />       
                <input name="Filiere" type="text" value={id} />   
                <input name="Sexe" type="text" value={id}  />
                <input name="Motdepasse" type="password" value={id}  />
                <input name="Batiment" type="text" value={id} />
                <input name="Etage" type="text" value={id}  />
                <input name="Chambre" type="text" value={id}  />
              </div>  
            </div>
        </div>
      </>
    )
}
