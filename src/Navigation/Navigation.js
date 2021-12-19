import React from 'react';
import './Navigation.css';
import logo from './logo.png';


const Navigation =({onRouteChange , isSignedIn}) =>{
    if(isSignedIn){
        return (
            <nav style={{display:'flex' ,
                         justifyContent:'space-between' ,
                         alignItems : 'center'
            }}>
                <div >
                    <img className="logo"  src={logo} alt="dwyl logo"/>
                </div>
                <div style={{display:'flex',
                             justifyContent:'space-between' ,
                             alignItems : 'center' ,
                             color :"white" ,
                             marginRight :'70px'
            }}>
                    <a onClick={()=>onRouteChange('scane')}> Scan&choix</a>
                    <a onClick={()=>onRouteChange('profile')}>Profile</a>
                    <a onClick={()=>onRouteChange('signin')}>Sign Out</a>
                </div>
            </nav>
        );
    }else {
        return (
            <nav style={{display:'flex' ,
            justifyContent:'space-between' ,
            alignItems : 'center'
}} >
                <div >
                    <img className="logo" src={logo} alt="dwyl logo"/>
                </div>
                <div style={{display:'flex',
                             justifyContent:'space-between' ,
                             alignItems : 'center' ,
                             color :"white" ,
                             marginRight :'70px'
            }} >
                   <p onClick={()=>onRouteChange('signin')}>Sign In</p>
                </div>
            </nav>
        );
    }
}
export default Navigation;