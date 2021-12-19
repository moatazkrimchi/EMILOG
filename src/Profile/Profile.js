import React from 'react';
import './Profiles.css';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showEdit:false,
            email : props.user.email,
            numero : props.user.numero,
            user:props.user
        }

    }
    onEmailChange =(event) =>{
        this.setState({email : event.target.value})
    }
    onNumeroChange =(event) =>{
        this.setState({numero : event.target.value})
    }



    onEditClick= ()=>{
        this.setState({showEdit:true})  
    }

    submitChangeProfile=()=>{
        fetch('http://localhost:3307/updateProfile',{
            method :'PUT',
            headers:{'Content-Type':'application/json'},
            body :JSON.stringify({
                matricle:this.props.user.matricule,
                email:this.state.email,
                numero:this.state.numero
            })
        })
        .then(response => response.json())
        .then(user=>{
            if(user ==='echec'){
                alert("Merci , D'inserer un email ou c valide !")    
            }else{
                alert("Merci , votre email ou numéro et bien modifier !")
                this.props.loadUser(user);
            }
        })
    }
    render(){
        const {showEdit}=this.state;
        const user = this.state.user; 
      return (
        <div className="usero pa4 black-80 " >  
    
    
            <div className="card-profile" >

            <div className='editZone'>
            <button  className="btn-edit-profile" type="submit" onClick={this.onEditClick} >Edit</button>
            </div>
            <div className="form-input"  >
        
                      <div className='div-input'>
                        <label className="label-profile" htmlFor="nom"> <strong>Nom : </strong></label>
                        <input className="input-texto" name="nom" type="text" disabled="false" placeholder={user.name} />
                      </div>
                     
                       
    
    
    

                      <div className='div-input'>
                      <label className="label-profile" htmlFor="Prenom"><strong>Prenom :</strong> </label>
                        <input className="input-texto" name="Prenom" type="text" disabled="false" placeholder={user.prenom} />
                      </div>
                        
            
    

                        <div className='div-input'>
                        <label className="label-profile" htmlFor="Matricule"> <strong>Maticule</strong> </label>
                        <input className="input-texto" name="Matricule" type="text" disabled="false" placeholder={user.matricule}/> 
                        </div>
                        
                
    
    
                        <div className='div-input'>
                        <label className="label-profile" htmlFor="Email"> <strong>Email : </strong> </label>
                            <input className="input-texto" 
                            name="Email" 
                            type="email"
                            placeholder={user.email} 
                            disabled={!showEdit}
                            onChange={this.onEmailChange}/>
                        </div>
                        
            
    
    
                         <div className='div-input'>
                         <label className="label-profile" htmlFor="Tel"> <strong>Tel</strong> </label>
                        <input 
                            className="input-texto" 
                            name="Tel"
                             type="text" 
                             placeholder={user.numero}
                            disabled={!showEdit} 
                            onChange={this.onNumeroChange} /> 
                         </div>
                        
        
    
    
                          <div className='div-input'>
                          <label className="label-profile" htmlFor="Promotion"> <strong>Promotion : </strong> </label>
                         <input className="input-texto" name="Promotion" type="text"   placeholder={user.Promo} disabled="false"/>
                          </div>
                       
                
    
    
                        <div className='div-input'>
                        <label className="label-profile" htmlFor="Filiere"><strong>Filiere : </strong> </label>
                        <input className="input-texto" name="Filiere" type="text" placeholder={user.filier} disabled="false"/> 
                        </div>
                        
            
    
    
                        <div className='div-input'>
                        <label className="label-profile" htmlFor="Sexe"> <strong>Sexe :</strong> </label>
                        <input className="input-texto" name="Sexe" type="text" placeholder={user.gender} disabled="false"/>
                        </div>
                       
                
    
    
                
                        {
                            // <label className="label-profile" htmlFor="Motdepasse"> <strong>Mot de Passe </strong> </label>
                            // <input className="input-texto" name="Motdepasse" type="password" placeholder={user.password} disabled='false' />
                        }
                
    
    
                         <div className='div-input'>
                         <label className="label-profile" htmlFor="batiment"> <strong> Batiment :</strong> </label>
                        <input className="input-texto" name="Batiment" type="text" placeholder={user.departement} disabled="false"/>
                         </div>
                        
                
    
    
                        <div className='div-input'>
                        <label className="label-profile" htmlFor="Etage"> <strong> Etage :  </strong> </label>
                        <input className="input-texto" name="Etage" type="text" placeholder={user.Etage}  disabled="false"/>
                        </div>
                        
                
    
    
                        <div className='div-input'>
                        <label className="label-profile" htmlFor="chambre"> <strong>Chambre : </strong> </label>
                        <input  className="input-texto" name="Chambre" type="text" placeholder={user.chambre} disabled="false" />
                        </div>
                        
            
                    <button  className="btn-save-profile"
                    onClick={this.submitChangeProfile}
                    style={{marginTop:'20px',display: showEdit ? 'block' : 'none'}}
                    type="submit"  >
                        Enrgitrer
                    </button>
                </div>  
            </div>
        </div>
           
      );
    }
   
}

export default Profile;
