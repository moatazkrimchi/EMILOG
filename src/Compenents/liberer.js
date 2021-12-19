import React from 'react'
import '../style/liberer.css'
import LiberationD from './liberationD'
import profile from '../images/profile.PNG'

export default function liberer() {
    return (
        <div className="liberer">
            <div className="head">
                <div className="lk"  >Batiment A/Etage/chambre1</div>
            </div>
            <div className="etat">
                    <p>Etat Chambre</p>
                    <input type="radio" id="occupe" name="gender" value="occupe" />
                    <label for="occupe">occupe</label><br/>
                    <input type="radio" id="disponible" name="gender" value="disponible" />
                    <label for="disponible">disponible</label><br/>
                    <input type="radio" id="indisponible" name="gender" value="indisponible" />
                    <label for="indisponible">indisponible</label><br/>
            </div> 
            <div className="editmobile" > <button>Enregistrer</button></div>
            <LiberationD name="Ayoub oukrirou" tel="0687767454" profile={profile} matr="193102" />
            <LiberationD name="Moataz Krimchi" tel="0659689676" profile={profile} matr="1475492" />
        </div>
    )
}

