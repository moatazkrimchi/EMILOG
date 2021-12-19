import React from 'react'
import styles from '../style/login.module.css'
import logo from '../images/logo.png'
import LockIcon from '@material-ui/icons/Lock';

export default function Login() {
 
    return (
        <div className={styles.login}>
            <img src={logo} alt="" className={styles.logo} />
            <form action="" className={styles.logform} >
                <div className={styles.tete}> <LockIcon/>  </div>
                <div className={styles.log} > <h1>Login </h1></div>
                <div className={styles.inp} >
                    <input type="text" placeholder="Enter your Email ! "  />
                </div>
                <div className={styles.inp} >
                    <input type="password" placeholder="Enter your Password ! "  />
                </div>
                <div className={styles.souvenir} >
                    <p> <input type="checkbox"/> se souveir de moi !</p>
                    <p className="oubl" >  Mot de passe oubliee  !</p>
                </div>
                <div>
            <button type="submit" > Se connecter  </button>
                </div>
            </form>
        </div>
    )
}
