const express = require('express') ;
var mysql = require('mysql') ;
const cors = require('cors') ;

const Upload = require('express-fileupload');
const  BodyParser = require('body-parser');

const app = express() ;


app.use(express.json());
app.use(BodyParser.json());
app.use(Upload());
app.use(cors());


var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "" ,
    database : "pidbé"
})

console.log('Hey from main');
class Etudiant{
    constructor(matricule ,classmement ,info) {
        this.matricule=matricule;
        this.classmement=classmement;
        this.info=info;
        this.idChombre=-1;
        this.etage=-1;
        this.serie='';
    }
    setIdChombre=(idChombre)=>{
        this.idChombre=idChombre -1 ;
    }
    setSerieChombre=(serie)=>{
        this.serie=serie ;
    }
    setEtage=(etage)=>{
        this.etage =etage
    }
}

class Chombre {
    // chombre : new Chombre(resulti.idChambre ,resulti.dispo ,resulti.serie ,resulti.Capacite)
    constructor(idChambre,dispo,serie,capasite){
        this.idChambre=idChambre;
        this.dispo=dispo;
        this.serie=serie;
        this.capasite=capasite;
        //new add
        this.ListEtudiant=[];
    }
    //set dispo chambre
    setDispo(dispo){
        this.dispo=dispo ;
    }

    // chercher etudiant :
    chercherEtudiant(matricule){
        for(let i =0 ; i< this.ListEtudiant.length ; i++){
            if(this.ListEtudiant[i].matricule===matricule){
                return this.ListEtudiants[i];
            }
        }
    }
    // verifier la disponibilite de la chombre :
    isDisponible(){
        const numberOfEtudiant = this.ListEtudiant.length  ;
        const capasite =this.capasite ;

        if(numberOfEtudiant < capasite ){
            return true;
        }else{
            return false;
        }
    }

    // Ajouter un etudiant a une chombre
    addEtudiant( etudiant){
        if(this.isDisponible()){
            this.ListEtudiant.push(etudiant)
        }else{
            console.log("PAS DE PLACE ICI ASSSI !")
        }

    }

      



}

class Etage {

    constructor(idEtage){
        this.idEtage=idEtage;
        this.chambers=[]
    }

    //ajouter une chombre dans cette etage
    addChombre(chombre){
        this.chambers.push( chombre );
    }
    

    //Chercher chombre assi houssam
    chercherChombre(idChambre){
        for(let i =0 ; i< this.chambers.length ; i++){
            if(this.chambers[i].idChambre===idChambre){
                return this.chambers[i];
            }
        }

    }

    //set dis




    // 1-random chombre of disponible chombre 
    // 1-1 get random elemrnt from list
    rand(items) {
        // "~~" for a closest "int"
        return items[~~(items.length * Math.random())];
    }

    //return id of avilable chombre (chombre dispo)
    getDispChombre(){
        var listOfDispoChombre =[]
        this.chambers.forEach(chombre =>{
            if(chombre.isDisponible()){
                listOfDispoChombre.push(chombre.idChambre)
            }
        })
        if(listOfDispoChombre===[]){
            return -1 ;

        }else{
            //random chombre dispo 
            var randomChombre =this.rand(listOfDispoChombre);
            //return idChombre dispo
            return randomChombre ;
        }

    }


    //affecter etudiant a une chombre specific 10
    affecterEtudiant(idChombre , etudiant){
        var chombre = this.chercherChombre(idChombre);
        etudiant.setIdChombre(idChombre);
        etudiant.setSerieChombre(chombre.serie);
        chombre.addEtudiant(etudiant);   
    }

    //verifier si ce ettage est pispo
    isDisponibleEtage(){
        var found = 0;
        const chambers =this.chambers ;
        if(chambers === []){
            return false ;
        }

        chambers.forEach(chombre =>{
            if(chombre.isDisponible()){
               found++ ;
            }
        })
        if(found > 0){
            return true
        }else{
            return false
        }
    }
    
    


}
class Batiment {
    constructor(idBatiment ,nomBatiment ,type ) {
        this.idBatiment=idBatiment;
        this.nomBatiment=nomBatiment;
        this.type=type;
        this.Etages=[];
        
    }


    //chercher etage 
    chercherEtage(idEtage){
        for(let i =0 ; i< this.Etages.length ; i++){
            if(this.Etages[i].idEtage===idEtage){
                return this.Etages[i];
            }
        }
    }

    //ajouter unetage a une chomber
    addEtage(etage){
        this.Etages.push(
             etage
        );
    }
    
    //initialiser un batiment avec des etage
    initBatiment(nombreEtage){
        for (let i=0 ; i< nombreEtage ; i++){
            var etage =new Etage(i);
            this.addEtage(etage);
        }

    }

    ajouterChombreEtage(idEtage ,chombre){
        var etage = this.Etages[idEtage];
        etage.addChombre(chombre);
        //console.log('ADD CHOMBRE WITH SUCCES !')
        // this.Etages[idEtage].addChombre(chombre)
    }

    //affecter un  etudiannt a un etage
    affectteEtudiantAunEtage(etudiant , choix){
        var  idChombre  ;
        var  ichoix ;
        for (let i=0 ;i<choix.length ;i++){
            ichoix = choix[i];   
            if(this.Etages[ichoix].isDisponibleEtage()){
                idChombre =this.Etages[ichoix].getDispChombre(); 
                etudiant.setEtage(ichoix);        
                this.Etages[ichoix].affecterEtudiant(idChombre, etudiant) ;
                
                console.log(' AFFECTATION AVEC SUCCES !          ')
                console.log(' Hey from  '+etudiant.info+' [ je suis dans '+etudiant.serie+']'+'---->'+'[Etage = '+ichoix+']'+'---->[chombre :'+idChombre+']')
                
                break ;
                     
            }
           

        }
        
    }
}

class GestionaireBatiment{
    constructor(){
        this.ListBatiment=[];
    }
    //chercher un batiment 
    chercherBatimnet(nomBatiment){
        for(let i =0 ; i< this.ListBatiment.length ; i++){
            if(this.ListBatiment[i].nomBatiment===nomBatiment){
                return this.ListBatiment[i];
            }
        }
    }

    //getALLstudentFromBatiment
    getALLstudentFromBatiment(idBatiment){
        var ListEtudiantinBat =[];
        const batiment =this.ListBatiment[idBatiment] ;
        batiment.Etages.forEach(etage =>{
            etage.chambers.forEach(chombre =>{
                if(chombre.ListEtudiant !=[]){
                    chombre.ListEtudiant.forEach(etudiant =>{
                        console.log(19999999999, etudiant)
                        ListEtudiantinBat.push(etudiant);
                    })
                }
                
            })
        })
        return ListEtudiantinBat;
    }
    //set dispo chombre 
    setDispoChombre(dispo , serie){

        this.ListBatiment.forEach(batiment =>{
            batiment.Etages.forEach(etage =>{
                    etage.chambers.forEach(chombre =>{
                        if(chombre.serie ===serie){
                            chombre.setDispo(dispo)
                            console.log(chombre.serie , 'CHAANGE TO ', dispo)
                            return ;
                        }
                    })
                    
                })
            })


    }



    // ajouter un batimnet 
    addBatiment(batiment){
        this.ListBatiment.push(
            batiment
        );
    }
    
    //listBatimentInfo =[{'idBatiment' ,'nomBatiment' ,'type' , 'nombre d'etage' }]
    init(listBatimentInfo){
        listBatimentInfo.forEach(batimenInfo=>{
            var batiment = new Batiment(batimenInfo.idBatiment , batimenInfo.nomBatiment , batimenInfo.type );
            console.log('batiment create ..')
            batiment.initBatiment(batimenInfo.nombreEtage)
            console.log('initialiser avec des etage')
            this.addBatiment(batiment)
            console.log('add avec succes !')

        })

    }
    //ajouter des chombre a des batiment deja creer avec leur etage
    //apres declaration de gestionbatiment.init()


    //listChombre = [{(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombre)}]

    ajouterListOfChombre(ListeOfChombre){
        ListeOfChombre.forEach(chombreInfo =>{
            this.ajouterChombreBat(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombreInfo.chombre)
        })
    }


    //ajouter une chiombre a un batiment et etage deja creer
    ajouterChombreBat(idBatiment , idEtage ,chombre){
        this.ListBatiment[idBatiment].ajouterChombreEtage(idEtage ,chombre);
    }

    ///creerer  des batiment et chambres 
    initialiserBatiment( listBatimentInfo ,ListeOfChombre){
        if(listBatimentInfo===[]){
            return ;
        }
        this.init(listBatimentInfo);
        if(ListeOfChombre === []){
            return ;
        }
       
         this.ajouterListOfChombre(ListeOfChombre);
        
    }


    //afffecter un etudiant a une chombre au hasrd
    affectteEtudiantAunBatiment(idBatiment ,  etudiant ,choix){
        const batiment = this.ListBatiment[idBatiment];
        batiment.affectteEtudiantAunEtage(etudiant ,choix);

    }


    // affecter des etudiant a une chombre dapres leur choix ;
    /// listEtudiantEtLeurChoix =[{etudiant ,choix}] 
    affectteEtudiant(idBatiment , listEtudiantEtLeurChoix ){
        const batiment = this.ListBatiment[idBatiment];
        listEtudiantEtLeurChoix.forEach(etudiantETleurChoix =>{
            batiment.affectteEtudiantAunEtage( etudiantETleurChoix.etudiant ,  etudiantETleurChoix.choix );
            // console.log("AFFECTTER AVEC SUCCES Mr  [ "+etudiantETleurChoix.etudiant.matricule+" ]")
        })
        return this.getALLstudentFromBatiment(idBatiment);
    }
}

















con.connect(function(err) {
    
    // in case of error
     if(err){
        console.log(err.code);
    }

  
        var gestionBatiment = new GestionaireBatiment();



        var listBatimentInfo =[];
        const q ="SELECT IdBatiment , NomBatiment , Sexe , NombreEtage from batiment"
        con.query(q,(err,result)=>{
            if(result ==[]){
                console.log("liste  viiide assi ")
                return ;
            } 
            result.forEach(resulti =>
                listBatimentInfo.push(
                    {
                        idBatiment : resulti.IdBatiment,
                        nomBatiment : resulti.NomBatiment,
                        type : resulti.Sexe ,
                        nombreEtage :resulti.NombreEtage 
    
                    }
                )

            )       
            
            console.log(999 ,'initialiser les batiments')
            gestionBatiment.init(listBatimentInfo)

        })
        //initialiser le batiment creer par un nombre des etage 
        

        //ajoutter des chombre 
        
        //1 1 listChombre = [{(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombre)}]
        var listChombre = [] ;
        
        const q1 ="SELECT idChambre, idBatiment , idEtage , dispo , Capacite , serie from room";
        con.query(q1,(err,result)=>{
            result.forEach(resulti =>
                listChombre.push(
                    {
                        idBatiment : resulti.idBatiment,
                        idEtage  : resulti.idEtage ,
                        chombre : new Chombre(resulti.idChambre+1 ,resulti.dispo ,resulti.serie ,resulti.Capacite)
    
                    }
                )

            )       
            
            
             console.log(888 ,"ajouter les chambres a des batiment deja kaynin")
            gestionBatiment.ajouterListOfChombre(listChombre)
        })

           // affecter des etudiant a une chombre dapres leur choix ;
        /// listEtudiantEtLeurChoix =[{etudiant ,choix}]
        app.get("/affectationAuxBatiment",(req,res)=>{
            var listEtudiantEtLeurChoix =[];
            const idBatiment = 0 ;
            const p = '1m'
            ///req.body.promotion ;
            const t = 'femme'
            ///req.body.type ;
            //const b = req.body.batiment ;

           /// SELECT etudiant.Matricule ,etudiant.classement ,etudiant.Prenom  ,choixetage.Choix1 ,choixetage.Choix2 ,choixetage.Choix3,choixetage.Choix4,choixetage.Choix5
           /// FROM etudiant , choixetage 
           /// WHERE (etudiant.Promotion='1m' and etudiant.Sexe='femme' ) and etudiant.Matricule =choixetage.MatriculeE
          ///  ORDER BY etudiant.classement ;
            var q ="SELECT etudiant.Matricule ,etudiant.classement ,etudiant.Prenom  ,choixetage.Choix1 ,choixetage.Choix2 ,choixetage.Choix3,choixetage.Choix4,choixetage.Choix5" ;
                    q=q+" FROM etudiant , choixetage";
                    q=q+" WHERE (etudiant.Promotion= ? and etudiant.Sexe= ? ) and etudiant.Matricule =choixetage.MatriculeE";
                    q=q+" ORDER BY etudiant.classement ";
            con.query(q,[p,t],function (err, result, fields) {
                if (err) throw err;
                result.forEach(etudChoix =>{
                    listEtudiantEtLeurChoix.push(
                        {
                            etudiant : new Etudiant(etudChoix.Matricule ,etudChoix.classement ,etudChoix.Prenom),
                            choix : [etudChoix.Choix1 ,etudChoix.Choix2 , etudChoix.Choix3 ,etudChoix.Choix4 ,etudChoix.Choix5 ]

                        }
                    )
                })
                
                console.log(listEtudiantEtLeurChoix);
                gestionBatiment.affectteEtudiant(idBatiment , listEtudiantEtLeurChoix );
                res.send(result);
                
            });
        });
        
        app.get('/affectatiofinal',(req,res)=>{
                res.json(gestionBatiment.ListBatiment);
        })

        app.post("/affectationData",(req,res)=>{

            console.log("#####################STARTTTT AFFECTATION #########################") ;
            var listEtudiantEtLeurChoix =[];
            const idBatiment = req.body.batiment ;
            const p =  req.body.level ;
            ///req.body.promotion ;
            const t =  req.body.sexe ;
            ///req.body.type ;
            //const b = req.body.batiment ;

           /// SELECT etudiant.Matricule ,etudiant.classement ,etudiant.Prenom  ,choixetage.Choix1 ,choixetage.Choix2 ,choixetage.Choix3,choixetage.Choix4,choixetage.Choix5
           /// FROM etudiant , choixetage 
           /// WHERE (etudiant.Promotion='1m' and etudiant.Sexe='femme' ) and etudiant.Matricule =choixetage.MatriculeE
          ///  ORDER BY etudiant.classement ;
            var q ="SELECT etudiant.Matricule ,etudiant.classement ,etudiant.Prenom  ,choixetage.Choix1 ,choixetage.Choix2 ,choixetage.Choix3,choixetage.Choix4,choixetage.Choix5" ;
                    q=q+" FROM etudiant , choixetage";
                    q=q+" WHERE (etudiant.Promotion= ? and etudiant.Sexe= ? ) and etudiant.Matricule =choixetage.MatriculeE";
                    q=q+" ORDER BY etudiant.classement ";
            con.query(q,[p,t],function (err, result, fields) {
                if (err) throw err;
                result.forEach(etudChoix =>{
                    listEtudiantEtLeurChoix.push(
                        {
                            etudiant : new Etudiant(etudChoix.Matricule ,etudChoix.classement ,etudChoix.Prenom),
                            choix : [etudChoix.Choix1 ,etudChoix.Choix2 , etudChoix.Choix3 ,etudChoix.Choix4 ,etudChoix.Choix5 ]

                        }
                    )
                })
            
                const listEtudiant = gestionBatiment.affectteEtudiant(idBatiment , listEtudiantEtLeurChoix );
                //historique
                if(listEtudiant){
                    listEtudiant.forEach(etudiant =>{
                        console.log(etudiant)
                        const qh ="INSERT INTO `emihistorique`(`Matricule`, `DateAffectation`, `serieChombre`) VALUES (?,?,?)"
                        con.query(qh,[etudiant.matricule ,'12/12/2021' ,etudiant.serie],function (err, result, fields) {
                            if (err) throw err;
                            console.log("ADD WITH SUCCES IN HISTORIE .")   
                        });
                        const qaa ="UPDATE `etudiant` SET `NumChambre`= ? ,`NomBatiment`= ? WHERE Matricule =?"
                        con.query(qaa,[etudiant.idChombre ,etudiant.etage,etudiant.matricule],function (err, result, fields) {
                            if (err) throw err;
                            console.log("AFFECTTER ASSI SEHLAOUI RAK NADI .")   
                        });
                    });

                }
               
                //
                
               
                console.log("#####################END AFFECTATION #########################") ;
                
            });
            
           
           res.json("succes");
            
        })
        app.post("/changeDispo",(req,res)=>{
            console.log(req.body.dispo , req.body.serieChombre)
            const dispo = req.body.dispo ;
            const serieChombre = req.body.serieChombre ;
            gestionBatiment.setDispoChombre(dispo , serieChombre);
            if((dispo != -1)){
                const q ="UPDATE `room` SET `dispo`=? WHERE serie= ?"
                con.query(q,[dispo , serieChombre],(err,result)=>{
                    if (err) throw err;
                    console.log("dispo is change")
                      
                
                
    
            })
            }
            
        })
        
        
        

        









































































  


































    app.get('/batimentInfo',(req,res)=>{
          res.json(gestionBatiment.ListBatiment);
    })































    



    app.get('/etudiant/first',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='1m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/1m',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='1m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/2m',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='2m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/3m',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='3m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/batiment',(req,res)=>{
        console.log('hellow from the backend to front end !')
           const q = "SELECT * from batiment " ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
  


app.post("/laylay",(req,res) =>{
   
        const   nom = req.body.prenom ;
      const   matricule = req.body.matricule ;
      const q = "UPDATE etudiant SET Nom = ? WHERE Matricule =?";
      
      con.query(q,[nom,matricule],(err,result)=>{
              if(err){
              res.status(400).send(err.toString())
              console.log(err);
          }else{
              res.send(result);
          }
      })
    } 
    )
    app.post('/modifier',(req,res)=>{
        const  nomb = req.body.nomb ;
        const sex = req.body.sex ;
        const idb = req.body.idb ;
        const  nombreetage = req.body.nombreetage ;
        const  nbrchmbre = req.body.nbrchmbre ;
        const q = "UPDATE batiment SET NomBatiment = ? , Sexe=? , NombreEtage=? ,NombreChmbre_E=? WHERE IdBatiment=?" ;
        con.query(q,[nomb,sex,nombreetage,nbrchmbre,idb]),(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    })
    app.post('/ajoutbatiment',(req,res)=>{
      const  nomb = req.body.nomb ;
      const sex = req.body.sex ;
      const  nombreetage = req.body.nombreetage ;
      const  nbrchmbre = req.body.nbrchmbre ;
      const q = "INSERT INTO `batiment` ( `NomBatiment`, `Sexe`, `NombreEtage`, `NombreChmbre_E`) VALUES( ?, ?, ?, ?)";
      con.query(q,[nomb,sex,nombreetage,nbrchmbre]),(err,result) =>{
          if(err){
              console.log(err);
          }else{
              res.send(result);
          }
      }
    } 
    )
    app.get('/etudiant/second',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='2m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.post('/deletbatiment',(req,res)=>{
        const idb = req.body.idb ; 
        const q = "DELETE FROM `batiment` WHERE `batiment`.`IdBatiment` = ?" ;
        con.query(q,[idb], function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    });
    app.post('/affectation',(req,res)=>{
        const matri = req.body.matricul ;
        const  q ="SELECT `batiment`.`NomBatiment` from `batiment` where `batiment`.`Sexe` =  ( Select `etudiant`.`Sexe` From `etudiant` where `etudiant`.`Matricule` = ? )" ;
        con.query(q,[matri], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.post('/proaff',(req,res)=>{
        const matri = req.body.matricul ;
        const  q ="SELECT * from `etudiant` where `etudiant`.`Matricule`= ?" ;
        con.query(q,[matri], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get('/etudiant/',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant " ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.post("/affectation/chambre",(req,res)=>{
        const etg = req.body.etg ;
        const nombt = req.body.nomb ;
        const q ="SELECT NumChambre from chambre where NumEtage=? and NomBatiment=? and Etat='Libre' " ;
        con.query(q,[etg,nombt],function(err,result,fields){
            if (err) throw err;
            console.log(etg);
            console.log(nombt);
            res.send(result);
        })
    });

    //=============================================
    app.get("/affectationBatiment",(req,res)=>{
        const q = "SELECT * from batiment " ;
        con.query(q,function(err,result){
            res.send(result);
        })
    })
    // the rooms parts : _____-------_________-------
    app.get("/rooms",(req,res)=>{
        const q ="SELECT * from chambre";
        con.query(q,function(err,result,fields){
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
    });
    app.post("/affecter/",(req,res)=>{
        const nombt = req.body.nomb ;
        const matri = req.body.matri ;
        const nc = req.body.nbrchambr ;
        const q ="UPDATE etudiant SET NomBatiment = ? , NumChambre=?  WHERE Matricule =?" ;
        con.query(q,[nombt,nc,matri],function (err, result, fields) {
            if (err) throw err;
            res.send(result)
            console.log(nombt +"hoe"+ matri + nc)
        });
    });
    app.get('/etudiant/third',(req,res)=>{
        console.log('hellow from the backend to front end !')
        const q = "SELECT * from etudiant where Promotion='3m'" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
    app.get('/etudiant/allstudent',(req,res)=>{
        console.log("bonjour ")
        const q = "SELECT * from etudiant" ;
        con.query(q, function (err, result, fields) {
            if (err) throw err;
            res.send(result)
        });
    })
























    //partie etudiant
    const database={
        users:[],
        admins:[]
    
    }
    
    const qe = "SELECT * FROM `etudiant` " ;
    con.query(qe ,function (err, result, fields) {
    if (err) throw err;
    result.forEach(r=>{
        database.users.push(
            {   
                name : r.Nom ,
                prenom :r.Prenom ,
                matricle : r.Matricule ,
                email : r.Email  ,
                numero : r.Telephone  ,
                Promotion : r.Promotion ,
                filiere : r.Filiere  ,
                gender : r.Sexe ,
                password : r.MotDePasse,
                Batiment : r.NomBatiment ,
                chambre : r.NumChambre ,
                classement :r.classement 
            }

        );

    })

     });

    //admin table 
    const qadmin = "SELECT * FROM `adminemi`" ;
    con.query(qadmin ,function (err, result, fields) {
    if (err) throw err;
    result.forEach(r=>{
        database.admins.push(
            {   
                name : r.nomAdmin ,
                prenom :r.prenomAdmin ,
           
                email : r.emailAdmin  ,

                password : r.passAdmin
            }

        );

    })
     });
    
    //app.use(express.static(__dirname+'/public'))
    app.get('/',(req ,res)=>{
        res.send(database.users)
    
    });
    
    
    app.put('/updateProfile',(req ,res)=>{
        const {matricle ,email , numero} =req.body;
        let found =false ;
        database.users.forEach(user =>{
            if(user.matricle===matricle ){
                found=true ;

                const q = "UPDATE `etudiant` SET `Email`=?,`Telephone`=? WHERE Matricule=?" ;
                con.query(q,[email , numero , matricle],function (err, result, fields) {
                    if (err) throw err;
                    console.log("Votre donnez en bien enregistrer")
                    res.json("Votre donnez en bien enregistrer")
                });
                
               
            }
            
        })
        if (!found){
            res.json('echec');
        }
    })
      
    
    
    app.put('/Choix', (req,res)=>{
        const {matricle, choix} =req.body;

        const choix1 =parseInt(choix.choix1);
        const choix2 =parseInt(choix.choix2);
        const choix3 =parseInt(choix.choix3 );
        const choix4 =parseInt(choix.choix4);
        const choix5 =parseInt(choix.choix5);

        let found =false ;
        console.log([choix1, choix2 , choix3 , choix4 , choix5 , matricle])
        database.users.forEach(user =>{
            if(user.matricle===matricle){
                console.log('coucou')
                found=true ;
                const q = "UPDATE `choixetage` SET `Choix1`=?,`Choix2`=?,`Choix3`=?,`Choix4`=?,`Choix5`=? WHERE MatriculeE=?" ;
                con.query(q,[choix1, choix2 , choix3 , choix4 , choix5 , matricle],function (err, result, fields) {
                    if (err) throw err;
                    console.log("eMAIL AND PHONE CHANGE")
                    res.send("Votre donnez en bien enregistrer")
                });
                return res.json("succés");
            }
        })
        if (!found){
            res.status(400).json('error not found');
        }
    
    })

    app.get('/choix/:matricle', (req,res)=>{
        const {matricle} =req.params;

        let found =false ;
        database.users.forEach(user =>{
            if(user.matricle ===parseInt( matricle)){
                found=true ;
                const q = "SELECT * FROM `choixetage` WHERE MatriculeE ="+user.matricle ;
                con.query(q,function (err, result, fields) {
                    if (err) throw err;

                    choix={
                        choix1 : result[0].Choix1,
                        choix2 : result[0].Choix2,
                        choix3 : result[0].Choix3,
                        choix4 : result[0].Choix4,
                        choix5 : result[0].Choix5
                        
                    }

                    res.send(choix)
                });
              
            }
        })
        if (!found){
            res.status(400).json('error not found');
        }
    
    })
    
    
    
    
    app.get('/download', function(req, res){
        const file = `${__dirname}/upload-folder/Note_pour_Inscriptions.docx`;
        res.download(file); 
      });    


    app.post('/signin' ,(req,res)=>{
        const {email , password} =req.body;
        let foundEleve =false ;
        let foundAd =false ;
        database.users.forEach(user =>{
            if(user.email===email && user.password=== password){
                foundEleve=true ;
                return res.json(user);
            }
        })
        database.admins.forEach(user =>{
            if(user.email===email && user.password=== password){
                foundAd=true ;
                return res.json('admin');
            }
        })
        if ((!foundEleve) && (!foundAd) ){
            res.json("echec");;
        }
    
    })
    
    
    app.post('/recus', (req,res)=>{
        if(req.files){
            console.log(req.files);
            var file = req.files.myFile ;
            var fileName =file.name;
            console.log(fileName);
            file.mv('./uploads/'+fileName ,(err)=>{
                if(err){
                    res.json(err)
                }else{
                    res.json("File Uploaded")
                }
               
            })
    
        }
    })
    



























































































});


app.listen(3307, ()=>{
    console.log('server run on ayoub');
});
