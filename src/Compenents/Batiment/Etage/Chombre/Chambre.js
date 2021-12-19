import { Component } from 'react';
import React from 'react';
import './ChambreH.css';



class Chambre extends Component{
    onInputChange=(dispo)=>{
        if (dispo===1)return "lightblue";
        if (dispo===0)return "white";
        if (dispo===2)return "red";
    }
        
    render(){
        const bgColor =this.onInputChange(this.props.dispo);
        return (
        
            <div className='Chambre'
            style={{backgroundColor: bgColor}}>
                <div>
                    <h2 className='NumChambre'>{this.props.idChambre}</h2>  
                    <button className="btn info" onClick={()=>alert(this.props.serie)} >{">"}</button>
                    
                </div>
                <div className="container">
                          <input className="radiobtn-modifier"  type="radio" 
                          style={{
                              display:this.props.disableModifier 
                            }} name={this.props.idChambre}/>
                </div>  
                
            </div >
        );
    }
}
export default Chambre;   