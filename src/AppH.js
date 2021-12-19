import {Component} from 'react';
import SearchBox from './SearchBox/SearchBox';
import Batiments from './Batiments/Batiments';
import './AppH.css';


class AppH extends Component{
  constructor(){
    super();
    this.state={
      serachfield:'',
      batimentData:[],
      disableModifier :"none"
    }
  }

  componentDidMount=()=>{
    const url = "http://localhost:3307/batimentInfo" ;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
       console.log(data);
        this.setState({batimentData : data} ) 
    })
}
  
  onClickModifier=()=>{
    console.log("hey from modifier")
    const disableModifier =this.state.disableModifier ;
    if(disableModifier==="none"){
      this.setState({disableModifier : "block"})
    }else{
      this.setState({disableModifier : "none"})
    }

    console.log(disableModifier)
  }

  onSearchChange=(event)=>{
    this.setState({serachfield :event.target.value})
  }
  
  render(){
     
      const  filteredBatiment = this.state.batimentData.filter(batiment =>{
        return  batiment.nomBatiment.toUpperCase().includes(this.state.serachfield.toUpperCase())
      }) 
      return(
          <div>
               <div className='searchzone'>
                  <div className='search'>
                      <SearchBox searchChange={this.onSearchChange}/>
                  </div>
                  <div  className='btn-modifier' onClick={this.onClickModifier}>Modifier</div>
                  

               </div>
               <Batiments batimentData={filteredBatiment} disableModifier={this.state.disableModifier}/>         
          </div>
        );
  }
  
}

export default AppH;

/**
 *                 <Etage chambres={this.chambres} idEtage={this.idEtage}/>
                <Etage chambres={this.chambres} idEtage={this.idEtage}/>
                <Etage chambres={this.chambres} idEtage={this.idEtage}/>

                <Chambre idChmbre={500} dispo={0}/>
 */
/**
 *   const filteredBatiment = batimentData.filter(batiment =>{
      return  batiment.nomBatiment.toLowerCase().includes(this.searchField.toLowerCase())
    });


               <Batiments batimentData={filteredBatiment}/>   

 */