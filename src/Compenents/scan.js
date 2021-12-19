import React from 'react'
import Choi from '../choi'
import choix from '../choix'
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import swal from 'sweetalert';
export default function scan() {
    function traitements (){
        swal("Good job!", "votre recu est en traitment", "");
    }
    return (
        <div>
            
        <div className="scanchoix" >
            <div className="title" ><strong> Scaner votre recu de paiement et choisir votre etage </strong></div>
          <div className="cont" >
             <div className="scan">  
                <div className="download">
                    <label htmlFor="fiche">Telecharger la fiche de paiment </label>
                     <label htmlFor=""><a href="#"> <button><GetAppIcon/></button></a></label> 
                </div>
                <div className="containe" >
                    <div>Sanner Votre recu</div>
                    <div>
                        <button onClick={()=>{traitements();}} > <PublishIcon /> </button>
                    </div>
                    <div> Taille maximale du recu est : 25 MB </div>
                </div>
                <div className="suivant">
                    <button>Suivante</button>
                </div>
              </div>
            {/* la partie du choix  */}
            <div className="choix" >
                    <div className="batimentaff" >Vous avez été affectés au batiment F:</div>
                
                    <div className="classer" >
                        <div>
                            <label htmlFor="c1">choix 1 : </label>
                             <label htmlFor="" className="choice" ><Choi nom={choix[0].nom}/></label> 
                        </div>
                        <div>
                            <label htmlFor="c1">choix 2 : </label>
                            <label className="choice"  ><Choi nom={choix[1].nom}/></label> 
                        </div>
                        <div>
                            <label htmlFor="c1">choix 3 : </label>
                            <label className="choice" ><Choi nom={choix[2].nom}/></label> 
                        </div>
                        <div>
                            <label htmlFor="c1">choix 4 : </label>
                            <label className="choice"  ><Choi nom={choix[3].nom}/></label>
                        </div>
                        <div>
                            <label htmlFor="c1">choix 5 : </label>
                            <label className="choice"  ><Choi nom={choix[4].nom}/></label>
                        </div>
                        <div className="save" >  
                           <button>Choisir </button>
                        </div>
                    </div>
                  
           </div>
          </div>
        </div>
    </div>
    )
}
