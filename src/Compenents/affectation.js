import React ,{useState} from 'react'
import '../style/affectation.css';
import axios from 'axios' ;
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from 'sweetalert'

export default function Affectation() {
    const [matricule, setmatricule] = useState() ;
    const [bats, setbats] = useState([]) ;
    const [etudiant, setetudiant] = useState([{}])
    const [chambres, setchambres] = useState([]) ;
    const [nc, setnc] = useState()
    const [etage, setetage] = useState() ;
    const [nombatiment, setnombatiment] = useState();
    function ajouter(){
        axios.post("http://localhost:3307/affectation/",{
            matricul : matricule
       }).then(res=>{
           setbats(res.data);
       })
    }
    function profiler(){
        axios.post("http://localhost:3307/proaff/",{
            matricul : matricule
       }).then(res=>{
          setetudiant(res.data);
       })
    }
    function suivant(){
        axios.post("http://localhost:3307/affectation/chambre",{
            etg : etage ,
            nomb : nombatiment
       }).then(res=>{
           setchambres(res.data);
       })
    }
    function affecter(){
        axios.post("http://localhost:3307/affecter",{
            matri : matricule ,
            etg : etage ,
            nomb : nombatiment ,
            nbrchambr : nc
        }).then(res=>{
            console.log(res.data) ;
        })
    }
    return (
        <div className="aff" >
            <div className="titre"> <strong>  Remplir le formulaire pour affecter un étudiant à une chambre </strong> </div>
            <div className="forms" >
                <form className="affectation" >
                    <h3> Formulaire d'affectation </h3>
                    <div>
                        <input type="text" placeholder="Matricule" value={matricule} onChange={(e)=>setmatricule(e.target.value)}/>  
                        <span> <CheckCircleIcon color="red" className="validate"  onClick={(e)=>{ajouter();profiler();e.preventDefault();}} /> </span>
                    </div>
                    <div>
                    <select name="batiment" id="batiment" value={nombatiment} onChange={(e)=>setnombatiment(e.target.value)} >
                                <option value="Nombatiment">Nombatiment</option>
                    {bats.map((bat,i)=>{
                        return(
                                <option value={bats[i].NomBatiment}> {bats[i].NomBatiment} </option>
                        );
                        })}
                    </select>
                    </div>
                    <div>
                        <select name="etage" id="etage" value={etage} onChange={(e)=>setetage(e.target.value)}>
                            <option value="Nombatiment">Etage</option>
                            <option value="1">Etage 1</option>
                            <option value="2">Etage 2</option>
                            <option value="3">Etage 3</option>
                            <option value="4">Etage 4</option>
                            <option value="5">Etage 5</option>
                        </select>
                        <span><CheckCircleIcon color="red" className="validate"  onClick={(e)=>{suivant();e.preventDefault();}}/></span>
                    </div>
                    <div>
                        <select name="chambre" id="chambre" value={nc} onChange={(e)=>setnc(e.target.value)}  >
                                <option value="Nombatiment">chambre</option>

                                {chambres.map((ch,i)=>{
                                return(
                                        <option value={chambres[i].NumChambre}> {chambres[i].NumChambre}</option>
                                );
                                })}
                        </select>
                    </div>
                    <div><button  onClick={(e)=>{affecter();
                    swal({
                        title: "Success!",
                        text: "vous avez affecter l'etudiant de matricule : "+matricule+" <br/> au Batiment :"+nombatiment+"dans la chambre :"+nc ,
                        icon: "success",
                        button: "ok!",
                    });
                    e.preventDefault();
                    }}  >Ajouter</button></div>
                </form>
                <form style={{color : "black" , overflow : "hidden"}} >
                       
                        <p><strong>Nom : </strong>  {etudiant[0].Nom}  </p> 
                        <p><strong>Prenom : </strong>  {etudiant[0].Prenom}  </p> 
                        <p><strong>Filiere : </strong>  {etudiant[0].Filiere}  </p> 
                        <p><strong>Email : </strong>  {etudiant[0].Email}  </p> 
                        <p><strong>Telephone : </strong>  {etudiant[0].Telephone}  </p> 
                        <p><strong>Promotion : </strong>  {etudiant[0].Promotion}  </p> 
                        <p><strong>Sexe : </strong>  {etudiant[0].Sexe}  </p> 
                      
                        
                </form>
            </div>
        </div>
    )
}
