import React, { useEffect, useState } from 'react'
import '../style/etudiant.css'
import axios from 'axios';
import style from '../style/profile.module.css'
import profile from '../images/profile.PNG'
import PersonIcon from '@material-ui/icons/Person';
import Modal from    'react-awesome-modal';
import { DataGrid } from "@material-ui/data-grid";


export default function Etudiant() {
  const techs={
    backgroundColor: "tomato"
  }
  const [users, setusers] = useState([])
  const [Chambre, setChambre] = useState()
  const [Motdepasse, setMotdepasse] = useState()
  const [Promotion, setPromotion] = useState()
  const [Tel, setTel] = useState()
  const [Batiment, setBatiment] = useState()
  const [Filiere, setFiliere] = useState()
  const [Sexe, setSexe] = useState()
  const [Email, setEmail] = useState()
  const [hoon, sethoon] = useState()
  const [prenom, setprenom] = useState()
  const [showmdal, setshowmdal] = useState(false)
  var [rows, setRows] = useState([])
  const [Matricule, setMatricule] = useState()
  const [niv, setniv] = useState("1 ere")
  const [bt1, setbt1] = useState({})
  const [bt2, setbt2] = useState({})
  const [bt3, setbt3] = useState({})
  const [refresh, setrefresh] = useState(true)
  const [tmop, settmop] = useState([])
  const T =[setbt1,setbt2,setbt3];
  
  function affichermodal(etudnt) {
    setshowmdal(true)
    sethoon(etudnt.Nom)
    setprenom(etudnt.Prenom)
    setMatricule(etudnt.id)
    setChambre(etudnt.Chambre)
    // setPromotion(users[i].Promotion)
    setFiliere(etudnt.Filiere)
    // setSexe(users[i].Sexe)
    // setEmail(users[i].Email)
    // setTel(users[i].Telephone)
    // setMotdepasse(users[i].MotDePasse)
    setBatiment(etudnt.Batiment)
  }
  function closemodal() {
    setshowmdal(false)
  }
  const configuration = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  }

 function firstyear(niveau, nivi,i) {
          var tmp=[]
          setTimeout(() => {
            axios.get("http://localhost:3307/etudiant/" + niveau + "/", configuration)
              .then(res => {
                setniv(nivi)
                setusers(res.data)
                tmp = [...tmp,res.data.map(ele=>{
                  return {
                    id:ele.Matricule,
                    Nom:ele.Nom,
                    Prenom:ele.Prenom,
                    Filiere:ele.Filiere,
                    Batiment:ele.NomBatiment,
                    Chambre:ele.NumChambre
                  }
                })]
                  setRows(tmp[0])
                });
            }, 10);
          settmop(tmp)
          T[i](techs)
          T[(i+1)%3]({})
          T[(i+2)%3]({})
  };
  useEffect(() => {
    firstyear("first", "1 ere","0");
  }, [refresh])
  const columns = [
    { field: "id", headerName: "Matricule", width: 120 },
    { field: "Nom", headerName: "Nom", width: 130 },
    { field: "Prenom", headerName: "Prenom", width: 130 },
    { field: "Filiere", headerName: "Filiere", width: 130 },
    { field: "Batiment", headerName: "Batiment", width: 130 },
    { field: "Chambre", headerName: "Chambre", width: 130},
    {
      field: "actions",
      headerName: "Profile",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                  <PersonIcon />
              </div>
          );
       }
      }
  ];
  async function sendfilali() {
    axios.post("http://localhost:3307/laylay/", {
      name: "ayoub",
      prenom: hoon,
      matricule: Matricule
    }).then(res=>{
      console.log({res})
      firstyear("first", "1 ere","0");
    })
    .catch(e=>console.error({e}))
    setshowmdal(false)
  }
  return (
    <div className="etudiant">
      <div className="niveau">
        <button className="pre" onClick={() => { firstyear("first", "1 ere","0") }} style={bt1} >1 ere annee</button>
        <button className="deux" onClick={() => { firstyear("second", "2 eme","1") }} style={bt2} >2 eme annee</button>
        <button className="trois" onClick={() => { firstyear("third", "3 eme","2")}} style={bt3} >3 eme annee</button>
      </div>
      <Modal visible={showmdal} width="650" height="300" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
      {/* <ReactModal isOpen={showmdal} className="modal"> */}
        <div>
          <div className={style.profile} >
            {/* <button className={style.edit} onClick={() =>changeText()}>{buttonText} </button> */}
            <div className={style.container} >
              <img src={profile} alt=""/>
            </div>
            <form>
              <div className={style.infos}>
                <div className={style.labels}>
                  <label htmlFor="nom" onClick={()=>affichermodal()} > <strong>Nom : </strong></label>
                  <label htmlFor="Prenom"><strong>Prenom :</strong> </label>
                  <label htmlFor="Matricule"> <strong>Maticule</strong> </label>
                  {/* <label htmlFor="Email"> <strong>Email : </strong> </label> */}
                  {/* <label htmlFor="Tel"> <strong>Tel</strong> </label> */}
                  {/* <label htmlFor="Promotion"> <strong>Promotion : </strong> </label> */}
                  <label htmlFor="Filiere"><strong>Filiere : </strong> </label>
                  {/* <label htmlFor="Sexe"> <strong>Sexe :</strong> </label>
                  <label htmlFor="Motdepasse"> <strong>MdP </strong> </label> */}
                  <label htmlFor="batiment"> <strong> Batiment:</strong> </label>
                  <label htmlFor="chambre"> <strong>Chambre: </strong> </label>
                </div>
                <div className={style.inputs}>
                  <input name="nom" type="text" value={hoon} onChange={(e) => sethoon(e.target.value)} />
                  <input name="Prenom" type="text" value={prenom} onChange={(e) => setprenom(e.target.value)} />
                  <input name="Matricule" type="text" value={Matricule} onChange={(e) => setMatricule(e.target.value)} disabled="true" />
                  {/* <input name="Email" type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />
                  <input name="Tel" type="text" value={Tel} placeholder={Tel} onChange={(e) => setTel(e.target.value)} />
                  <input name="Promotion" type="text" value={Promotion} onChange={(e) => setPromotion(e.target.value)} /> */}
                  <label name="Filiere" >{Filiere} </label>
                  {/* <label name="Sexe" >{Sexe} </label>
                  <input name="Motdepasse" type="text" value={Motdepasse} onChange={(e) => setMotdepasse(e.target.value)} /> */}
                  <label name="Batiment" >{Batiment} </label>
                  <label name="Chambre" >{Chambre} </label>
                </div>
              </div>
            </form>
            <div>
                  <button className={style.edit} id="enregistrer" value="submit" type="submit" onClick={()=>{sendfilali()}}>Enregistrer</button>
                  <button onClick={() => closemodal()} className={style.edit}>Annuler</button>   
            </div>
          </div>
        </div>
      </Modal>
      <div className="list">
        <p className="promo" >  Promotion {niv} annee !  </p>
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns}  
            onRowSelected={(e)=>affichermodal(e.data)} pageSize={17} />
        </div>
      </div>
    </div>
  )
}
