import React from 'react';
import './Choix.css';
import swal from 'sweetalert';

class Choix extends React.Component {

    constructor(props){
        super(props);
        this.state={
            choix1 : 0,
            choix2 : 0,
            choix3 : 0,
            choix4 : 0,
            choix5 : 0
            
        }

    }

    componentDidMount(){
        fetch('http://localhost:3307/choix/'+this.props.user.matricule)
        .then(response => response.json())
        .then(data=>{
            this.setState({
                choix1 : data.choix1,
                choix2 : data.choix2,
                choix3 : data.choix3,
                choix4 : data.choix4,
                choix5 : data.choix5
            })
            console.log(this.state)
        })
    }
  
    onChoixChange1 =(event) =>{
        this.setState({choix1 : event.target.value})
    }
    onChoixChange2 =(event) =>{
        this.setState({choix2 : event.target.value})
    }
    onChoixChange3 =(event) =>{
        this.setState({choix3 : event.target.value})
    }
    onChoixChange4 =(event) =>{
        this.setState({choix4 : event.target.value})
    }
    onChoixChange5 =(event) =>{
        this.setState({choix5 : event.target.value})
    }
  
    onSubmitChoix =() =>{
        console.log(this.state);
        fetch('http://localhost:3307/Choix',{
            method :'PUT',
            headers:{'Content-Type':'application/json'},
            body :JSON.stringify({
                matricle:this.props.user.matricule,
                choix:this.state
            })
        })
        .then(response => response.json())
        .then(data=>{
            
            if(data==="succés"){
                swal("Good job!", "votre choix ete bien enregistre", "");
            }else{
                document.getElementById('outChoix').textContent="Merci de rechoisir";
            }
        })
        
    }



    render(){
        const user = this.props.user;
        return (
            <main className="pa4 black-80">
                <div className="measure center">    
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <div className="f4 fw6 ph0 mh0">
                          Trier vos chois d'etage alon du 1etage au 5:
                        </div>
                        <div className=" f4 fw6 ph0 mh0">
                        
                            <p className="pa2  bg-transparent  hover-white" 
                             id="outChoix"  ></p>
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Choix 1 :</label>
                        <input onChange={this.onChoixChange1} className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                                type="number" placeholder={this.state.choix1}
                                name="choix1"  min="1" max="5" />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Choix 2 :</label>
                        <input onChange={this.onChoixChange2} className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                                type="number" placeholder={this.state.choix2}
                                name="choix2"  min="1" max="5" />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Choix 3 :</label>
                        <input onChange={this.onChoixChange3} className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                                type="number" placeholder={this.state.choix3}
                                name="choix3"  min="1" max="5" />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Choix 4 :</label>
                        <input onChange={this.onChoixChange4} className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                                type="number" placeholder={this.state.choix4}
                                name="choix4"  min="1" max="5" />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Choix 5 :</label>
                        <input onChange={this.onChoixChange5} className="pa2 input-reset ba bg-transparent  hover-white w-100" 
                                type="number" placeholder={this.state.choix5}
                                name="choix5"  min="1" max="5" />
                        </div>
                        <div className="choisir">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            onClick={this.onSubmitChoix}
                            value="Choisir"/>
                       </div>
                    </fieldset> 
                </div>
            </main>
        
        );
    }
}

export default Choix;
