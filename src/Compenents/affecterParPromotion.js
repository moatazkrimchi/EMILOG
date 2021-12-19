import React ,{useState,useEffect} from 'react'
import '../style/affectationglobal.css'
import axios from   'axios' ;

export default function AffecterParPromotion() {
    const [level, setlevel] = useState() ;
    const [listbatiment, setlistbatiment] = useState([]);
    const [batiment, setbatiment] = useState();
    const [sexe, setsexe] = useState();
    const [refresh, setrefresh] = useState(true)
    function envoyer(){
       axios.post("http://localhost:3307/affectationData",{
           level : level ,
           batiment: batiment  ,
           sexe : sexe
       })
    };  
    useEffect(() => {
       axios.get("http://localhost:3307/affectationBatiment").
       then(res=>{
           setlistbatiment(res.data);
       })
    }, [refresh])
    return (
        <div>
            <div className="affg">
                    <div>Choisir La promotion et le sexe puis le departement pour lea affecter </div>
                    <div>
                        <select name="promotion" id="" placeholder="Promotion" value={level} onChange={(e)=>setlevel(e.target.value)}>
                            <option value="1">1ere anne</option>
                            <option value="2">2ere anne</option>
                            <option value="3">3ere anne</option>
                        </select>
                        <select name="" id="" value={sexe} placeholder="Sexe" onChange={(e)=>setsexe(e.target.value)} >
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                        </select>
                    </div>
                    <div>
                        <select action="" value={batiment} placeholder="Batiment" onChange={(e)=>setbatiment(e.target.value)}>
                            {listbatiment.map((bat,i)=>{
                            return(
                                    <option value={listbatiment[i].IdBatiment}> {listbatiment[i].NomBatiment} </option>
                            );
                            })}
                        </select>
                    </div>
                    <div>
                        <button onClick={()=>envoyer()}>Affecter</button>
                    </div>
            </div>
        </div>
    )
}
