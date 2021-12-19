import './App.css';
import React from 'react'
import Etudiant from './Compenents/etudiant'
import Nav from './Compenents/navbar'
import Addbatiment from './Compenents/addbatiment'
import Liberer from './Compenents/liberer'
import Sidbar from './Compenents/sidbar'
import Chambers from './Compenents/chambrs'
import Affectation from './Compenents/affectation'
import AffecterParPromotion from './Compenents/affecterParPromotion'
import {BrowserRouter as Router,Switch ,Route} from 'react-router-dom'
import AppH from './AppH';
import AppEleve from './AppEleve';


function App() {
  return (
     <Router>
          <Switch>
                <Route path="/etudiant">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Etudiant/>
                  </div>
                </Route> 
                <Route path="/addbatiment">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Addbatiment/>
                  </div>
                </Route> 
                <Route path="/chambre">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Liberer/>
                  </div>
                </Route> 
                <Route path="/liberer">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Affectation/>
                  </div>
                </Route>
                <Route path="/affectationglobal">
                  <Nav/>
                  
                   <AffecterParPromotion/>
                  
                </Route>
                <Route path="/chambers">
                   <Nav/>
                   <Chambers/>
                </Route>
                <Route path="/app">
                   <Nav/>
                   <AppH/>
                </Route>
                <Route path="/">
                   <AppEleve/>
                </Route>
          </Switch>
     </Router>
  );
}

export default App;
