import React, {useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../style/batiment.css' ;
import AddIcon from '@material-ui/icons/Add';
import ReactModal from 'react-modal'
import axios from   'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import swal from 'sweetalert'

export default function Addbatiment() {
    const [nbretage, setnbretage] = useState()
    const [sexe, setsexe] = useState()
    const [idbatiment, setidbatiment] = useState()
    const [showeditModal, setshoweditModal] = useState()
    const [nombatiment, setnombatiment] = useState()
    const [nombrechambre, setnombrechambre] = useState()
    const [showModal, setshowModal] = useState(false) ;
    const [bratchs, setbratchs] = useState([]);
    function handleOpenModal () {
        setshowModal(true);
      }
    function handleCloseModal () {
        setshowModal(false);    
    }
    function OpeneditModal (i) {
        setnombatiment(bratchs[i].NomBatiment)
        setnombrechambre(bratchs[i].NombreChmbre_E)
        setsexe(bratchs[i].Sexe)
        setnbretage(bratchs[i].NombreEtage)
        setidbatiment(bratchs[i].IdBatiment)
        setshoweditModal(true);
      }
    function CloseeditModal () {
        setshoweditModal(false);    
    }
    function isdelet(i){
        swal({
            title: "Etes vous sur de vouloir supprimer ce batiment?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            deleter(i);
            if (willDelete) {
              swal("Le batiment est supprimee", {
                icon: "success",
              });
            } else {
              swal("Votre batiment est toujour la ");
            }
          });
    }
    const configuration = {
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"        
        }
        }
        function awid(){
            setTimeout(() => {
                axios.get("http://localhost:3307/batiment/",configuration )
                .then(res =>{
                    setbratchs(res.data)
                });
              }, 10);     
        }; 
        function  sendbatiment(){
                axios.post("http://localhost:3307/ajoutbatiment/",{
                    nomb : nombatiment ,
                    sex : sexe ,
                    nombreetage : nbretage ,
                    nbrchmbre : nombrechambre
                })
                setshowModal(false)
        };
        function  modifier(){
            axios.post("http://localhost:3307/modifier/",{
                idb : idbatiment ,
                nomb : nombatiment ,
                sex : sexe ,
                nombreetage : nbretage ,
                nbrchmbre : nombrechambre
            })
            setshoweditModal(false)
        }
        function deleter(i) {
            axios.post("http://localhost:3307/deletbatiment/",{
                idb : bratchs[i].IdBatiment  
            }) 
        }
    return (
            <div className="batiments" >
                <div className="lfo">
                  <div className="titre" > <strong> Liste des batiments</strong> </div>
                  <div className="ajouter" > <button onClick={()=>handleOpenModal()}><AddIcon/><p>Ajouter</p></button> </div>
                  {/* React modals to add new batiment  */}
                    <ReactModal isOpen={showModal} className="modal" >
                           <div className="title" > <strong>Remplir le formulaire pour ajouter un batiment </strong>  </div>
                           <div className="formulaire">

                               <div className="ajout"  > <strong>  Ajout Batiment </strong> </div>
                                   
                                <div className="batiment" >
                                    <label htmlFor="batiment">Nom de Batiment :</label>
                                    <input type="text" name="batiment" value={nombatiment} onChange={(e)=>setnombatiment(e.target.value)}  />
                                </div>
                                <div className="etage" >
                                    <label htmlFor="etage">Nombre d'etage :</label>
                                    <input type="text" name="etage"  value={nbretage} onChange={(e)=>setnbretage(e.target.value)} />
                                </div>
                                <div className="nbrchambreetage">
                                    <label htmlFor="nbre">Nombre de chambre par etage :</label>
                                    <input type="text" name="nbre" value={nombrechambre} onChange={(e)=>setnombrechambre(e.target.value)}  />
                                </div>
                                <div>
                                    <label htmlFor="nbre">Sexe :</label>
                                    <i>
                                        <label className="lab1" htmlFor="Femme">Femme</label>
                                        <input className="fe" type="radio" id="sexein" name="Femme" value="Femme" onChange={(e)=>setsexe(e.target.value)} />
                                       
                                    </i>
                                    <i>
                                        <label className="lab2" htmlFor="Homme">Homme</label>
                                        <input className="ho" type="radio" id="sexein" name="Homme" value="Homme" onChange={(e)=>setsexe(e.target.value)} />
                                    </i>
                                </div>
                                <div className="config" >
                                    <button onClick={()=>sendbatiment()}  >Ajouter</button>
                                    <button onClick={()=>handleCloseModal()}>Annuler</button>
                                </div>
                                </div>
                    </ReactModal>
                    <ReactModal isOpen={showeditModal} className="modal" >
                           <div className="title" ><strong>Remplir le formulaire pour Modifier ce batiment </strong></div>
                           <div className="formulaire">
                               <div className="ajout"  > <strong>  Modifier Batiment </strong> </div>
                                <div className="batiment" >
                                    <label htmlFor="batiment">Nom de Batiment :</label>
                                    <input type="text" name="batiment" value={nombatiment} onChange={(e)=>setnombatiment(e.target.value)}  />
                                </div>
                                <div className="etage" >
                                    <label htmlFor="etage">Nombre d'etage :</label>
                                    <input type="text" name="etage"  value={nbretage} onChange={(e)=>setnbretage(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="nbre">Nombre de chambre par etage :</label>
                                    <input type="text" name="nbre" value={nombrechambre} onChange={(e)=>setnombrechambre(e.target.value)}  />
                                </div>
                                <div>
                                    <label htmlFor="nbre">Sexe :</label>
                                    <input type="text" id="sexein" name="nbre" value={sexe} onChange={(e)=>setsexe(e.target.value)} />
                                </div>
                                <div className="config" >
                                    <button onClick={()=>modifier()}  >Modifier</button>
                                    <button onClick={()=>CloseeditModal()}>Annuler</button>
                                </div>
                            </div>
                    </ReactModal>
                </div>
                <div className="nour" >
                  <table>
                    <tr>
                       <th>Nom Batiment</th>
                       <th>Nombre d'etage</th>
                       <th>Nombre de chambre/etage</th>
                       <th>Sexe</th>
                       <th className="buttons" > <button onClick={()=>awid()} ><ExpandMoreIcon/></button> </th>
                       <th className="buttons" ></th>
                    </tr>
                    
                    {bratchs.map((bat,i)=>{
                      return(
                        <tr> 
                            <td>{bratchs[i].NomBatiment}</td>
                            <td>{bratchs[i].NombreEtage}</td>
                            <td>{bratchs[i].NombreChmbre_E}</td>
                            <td>{bratchs[i].Sexe}</td>
                            <td className="buttons" > <button onClick={()=>isdelet(i)}> <DeleteIcon/> </button>
                            <button onClick={()=>OpeneditModal(i)} ><EditIcon/></button></td>
                        </tr> 
                      );
                    })}
                  </table>  
                </div>  
            </div>
        )
};
