console.log('Hey from main');
class Etudiant{
    constructor(matricule ,classmement ) {
        this.matricule=matricule;
        this.classmement=classmement;
        this.idChombre=-1;
    }
    setIdChombre=(idChombre)=>{
        this.idChombre=idChombre ;
    }
}
class Chombre {
    constructor(idChambre,dispo,serie,capasite){
        this.idChambre=idChambre;
        this.dispo=dispo;
        this.serie=serie;
        this.capasite=capasite;
        //new add
        this.ListEtudiant=[];
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
        this.chambers.push(
            chombre
        );
    }
    

    //Chercher chombre assi houssam
    chercherChombre(idChambre){
        for(let i =0 ; i< this.chambers.length ; i++){
            if(this.chambers[i].idChambre===idChambre){
                return this.chambers[i];
            }
        }

    }




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
        console.log('ADD CHOMBRE WITH SUCCES !')
        // this.Etages[idEtage].addChombre(chombre)
    }

    //affecter un  etudiannt a un etage
    affectteEtudiantAunEtage=(etudiant , choix)=>{
        var  idChombre  ;
        var  ichoix ;
        for (let i=0 ;i<choix.length ;i++){
            ichoix = choix[i];   
            if(this.Etages[ichoix].isDisponibleEtage()){
                idChombre =this.Etages[ichoix].getDispChombre();         
                this.Etages[ichoix].affecterEtudiant(idChombre, etudiant) ;
                console.log('AFFECTATION AVEC SUCCES !')
                console.log('['+etudiant.matricule+']'+'-------------->'+'[Etage = '+ichoix+']'+'------------>[chombre :'+idChombre+']')
                
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
    }
}

const batimentData = [
    {
        nomBatiment:'A',
        type:'H',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                   
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    },
                    {
                        idChmbre:7,
                        dispo:0
                    },
                    {
                        idChmbre:8,
                        dispo:0
                    },
                    {
                        idChmbre:9,
                        dispo:0
                    },
                    {
                        idChmbre:10,
                        dispo:0
                    },
                    {
                        idChmbre:11,
                        dispo:0
                    },
                    {
                        idChmbre:12,
                        dispo:0
                    },
                    {
                        idChmbre:13,
                        dispo:0
                    },
                    {
                        idChmbre:14,
                        dispo:0
                    },
                    {
                        idChmbre:15,
                        dispo:0
                    },
                    {
                        idChmbre:16,
                        dispo:0
                    },
                    {
                        idChmbre:17,
                        dispo:0
                    },
                    {
                        idChmbre:18,
                        dispo:1
                    },
                    {
                        idChmbre:19,
                        dispo:0
                    },
                    {
                        idChmbre:20,
                        dispo:0
                    },
                    {
                        idChmbre:21,
                        dispo:0
                    },
                    {
                        idChmbre:22,
                        dispo:1
                    },
                    {
                        idChmbre:23,
                        dispo:0
                    },
                    {
                        idChmbre:24,
                        dispo:2
                    },
                    {
                        idChmbre:25,
                        dispo:0
                    },
                    {
                        idChmbre:26,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    },
                    {
                        idChmbre:7,
                        dispo:0
                    },
                    {
                        idChmbre:8,
                        dispo:0
                    },
                    {
                        idChmbre:9,
                        dispo:0
                    },
                    {
                        idChmbre:10,
                        dispo:0
                    },
                    {
                        idChmbre:11,
                        dispo:0
                    },
                    {
                        idChmbre:12,
                        dispo:0
                    },
                    {
                        idChmbre:13,
                        dispo:0
                    },
                    {
                        idChmbre:14,
                        dispo:0
                    },
                    {
                        idChmbre:15,
                        dispo:0
                    },
                    {
                        idChmbre:16,
                        dispo:0
                    },
                    {
                        idChmbre:17,
                        dispo:0
                    },
                    {
                        idChmbre:18,
                        dispo:1
                    },
                    {
                        idChmbre:19,
                        dispo:0
                    },
                    {
                        idChmbre:20,
                        dispo:0
                    },
                    {
                        idChmbre:21,
                        dispo:0
                    },
                    {
                        idChmbre:22,
                        dispo:1
                    },
                    {
                        idChmbre:23,
                        dispo:0
                    },
                    {
                        idChmbre:24,
                        dispo:2
                    },{
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    },
                    {
                        idChmbre:7,
                        dispo:0
                    },
                    {
                        idChmbre:8,
                        dispo:0
                    },
                    {
                        idChmbre:9,
                        dispo:0
                    },
                    {
                        idChmbre:10,
                        dispo:0
                    },
                    {
                        idChmbre:11,
                        dispo:0
                    },
                    {
                        idChmbre:12,
                        dispo:0
                    },
                    {
                        idChmbre:13,
                        dispo:0
                    },
                    {
                        idChmbre:14,
                        dispo:0
                    },
                    {
                        idChmbre:15,
                        dispo:0
                    },
                    {
                        idChmbre:16,
                        dispo:0
                    },
                    {
                        idChmbre:17,
                        dispo:0
                    },
                    {
                        idChmbre:18,
                        dispo:1
                    },
                    {
                        idChmbre:19,
                        dispo:0
                    },
                    {
                        idChmbre:20,
                        dispo:0
                    },
                    {
                        idChmbre:21,
                        dispo:0
                    },
                    {
                        idChmbre:22,
                        dispo:1
                    },
                    {
                        idChmbre:23,
                        dispo:0
                    },
                    {
                        idChmbre:24,
                        dispo:2
                    },{
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    },
                    {
                        idChmbre:7,
                        dispo:0
                    },
                    {
                        idChmbre:8,
                        dispo:0
                    },
                    {
                        idChmbre:9,
                        dispo:0
                    },
                    {
                        idChmbre:10,
                        dispo:0
                    },
                    {
                        idChmbre:11,
                        dispo:0
                    },
                    {
                        idChmbre:12,
                        dispo:0
                    },
                    {
                        idChmbre:13,
                        dispo:0
                    },
                    {
                        idChmbre:14,
                        dispo:0
                    },
                    {
                        idChmbre:15,
                        dispo:0
                    },
                    {
                        idChmbre:16,
                        dispo:0
                    },
                    {
                        idChmbre:17,
                        dispo:0
                    },
                    {
                        idChmbre:18,
                        dispo:1
                    },
                    {
                        idChmbre:19,
                        dispo:0
                    },
                    {
                        idChmbre:20,
                        dispo:0
                    },
                    {
                        idChmbre:21,
                        dispo:0
                    },
                    {
                        idChmbre:22,
                        dispo:1
                    },
                    {
                        idChmbre:23,
                        dispo:0
                    },
                    {
                        idChmbre:24,
                        dispo:2
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    },
    {
        nomBatiment:'B',
        type:'H',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    },
    {
        nomBatiment:'C',
        type:'F',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    },
    {
        nomBatiment:'TITANIC',
        type:'F',
        Etages:[
            {
                idEtage:1,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },
            {
                idEtage:2,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            },         
            {
                idEtage:3,
                chambres:[
                    {
                        idChmbre:1,
                        dispo:0
                    },
                    {
                        idChmbre:2,
                        dispo:0
                    },
                    {
                        idChmbre:3,
                        dispo:0
                    },
                    {
                        idChmbre:4,
                        dispo:0
                    },
                    {
                        idChmbre:5,
                        dispo:0
                    },
                    {
                        idChmbre:6,
                        dispo:0
                    }
                ]
            }
        ]
    }
  ];
  
// var gestionBatiment = new GestionaireBatiment();
// var listBatimentInfo =[
//         { idBatiment  : 0 , nomBatiment : 'A', type :'H' , nombreEtage : 5}
//     ]

// //initialiser le batiment creer par un nombre des etage ici =5
// gestionBatiment.init(listBatimentInfo)

// //ajoutter des chombre 

// //1 1 listChombre = [{(chombreInfo.idBatiment ,chombreInfo.idEtage ,chombre)}]

// var listChombre = [] ;
// var i=0 ;
// var numEtage = 5;
// var numChombre = 100;
// for ( i=0 ;i<numEtage ;i++){
//     for (j=0 ;j<numChombre ;j++){
//         var serie = '#B'+0+'E'+i+'CH'+j ;
//         var chambere = new Chombre(j ,1,serie ,1)
//         listChombre.push(
//             {idBatiment : 0 , idEtage :i , chombre:chambere}
//         )
//     }
// }
// console.log(listChombre)
// gestionBatiment.ajouterListOfChombre(listChombre )

// //list des etudiant :
// //listEtudiantEtLeurChoix =[{etudiant ,choix}] 
// //(matricule ,classmement ,info)
// var listEtudiantEtLeurChoix =[]
// var k =0;
// var numEtudiant = 500 ;
// for (k=0 ; k < numEtudiant; k++){
//     var matricule = '#ELEVE /'+k
//     var etudiant = new Etudiant(matricule ,k ,'Informatique')
//     var choixE = [0,1,2,3,4]
//     listEtudiantEtLeurChoix.push(
//         {etudiant:etudiant ,choix:choixE}
//     )
// }


// console.log(listChombre)
// var currentTime = new Date()
// var startTime =new Date()

// //program
// gestionBatiment.affectteEtudiant(0,listEtudiantEtLeurChoix);


// var endTime =new Date()
// var Time=endTime-startTime
// console.log('le temps pour affectter  '+numEtudiant+'  Etudiant est : '+Time+' ms')