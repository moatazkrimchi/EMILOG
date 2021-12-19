import React from 'react'
import style from '../style/navbar.module.css'
import profile from '../images/profile.PNG'
import logo from "../images/logo.png"

export default function navbar(props) {
    return (
        <div>
            <dir className={style.nav} >
               <div className={style.logo} > <img src={logo} alt=""/> </div>
               <div className={style.rightsid} >
                   <div className={style.admin} >  {props.type} </div>
                   <div className={style.profile} > <img src={profile} alt=""/>  </div>
               </div>
            </dir>
        </div>
    )
}
