import React from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';

class Signin extends React.Component {

    constructor(props){
        super(props);
        this.state={
            signInEmail : '',
            signInPassword :'',
            signredirection : "/"
        }

    }

    onEmailChange =(event) =>{
        this.setState({signInEmail : event.target.value})
    }
    onPasswordChange =(event) =>{
        this.setState({signInPassword : event.target.value})
    }
    onSubmitSignIn =() =>{
        fetch('http://localhost:3307/signin',{
            method :'POST',
            headers:{'Content-Type':'application/json'},
            body :JSON.stringify({
                email:this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user=>{
            if(user ==='echec'){
                alert("invalid email ou password ")
            }
            else if(user==='admin'){
                this.setState({signredirection : "/etudiant"})
                document.getElementById("to-admin").click()
            }
            else{
                this.props.loadUser(user);
                this.props.onRouteChange('profile');
            }
        })
        
    }



     render(){
    return (
        <div className="card-log">
            <div className="container">
            <main className="pa4 black-80 cardd">
            <div className="measure center cardS">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent  w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent  w-100" type="password" name="password"  id="password"/>
                    </div>
                    
                </fieldset>
                <div className="btn-signin">
                <Link id="to-admin" to={this.state.signredirection} >
                     <input className="signLog b ph3 pv2 input-reset ba b-black  grow pointer f6 dib" 
                    type="submit" 
                    onClick={this.onSubmitSignIn}
                    value="Sign in"/>
                </Link>
                    
                </div>

            </div>
           </main>
          </div>
        </div>
        
      
      );
}
  
}

export default Signin;
