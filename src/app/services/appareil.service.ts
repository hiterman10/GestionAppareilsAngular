import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable, } from "@angular/core";

@Injectable()
export class AppareilService {
  
// creation de la methode Subject
  appareilSubject = new Subject<any[]>();
    
  /* creation d'un tableau avec les elements */
  private appareils = [
    {
      id: 1,
      name: 'machine à laver',
      status: 'allumé'
    }, 
   {
       id: 2,
      name: 'Television',
      status: 'allumé'
    }, 
   {
      id: 3,
      name: 'Ordinateur',
      status: 'eteint'
    }  
  ];

  constructor(private httpClient: HttpClient){}

//emitAppareilSubject() permet d'acceder aux données depuis l'exterieur
  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

//cette methode permet de retourner un objet par son identifiant
  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  /* cette declaration est equivalente au tableau ci-haut
  
  appareilOne = "Machine à laver";
  appareilTwo = "Television";
  appareilThree = "Ordinateur"; 
  
  */


  switchOnAll(){
      for(let appareil of this.appareils){
          appareil.status = 'allumé'
      }
      this.emitAppareilSubject();
  }

  switchOffAll(){
    for(let appareil of this.appareils){
        appareil.status = 'eteint'
    }
    this.emitAppareilSubject();
}

switchOnOne(index: number){
  this.appareils[index].status ='allumé';
  this.emitAppareilSubject();
  }

switchOffOne(index: number){
  this.appareils[index].status ='eteint';
  this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string){
     const appareilObject = {
       id: 0,
       name: '',
       status: '',
     };
     appareilObject.name = name;
     appareilObject.status =status;
     appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;


     this.appareils.push(appareilObject);
     this.emitAppareilSubject();
  }

  // Methode permettant d'enregistrer les données sur le serveur
  saveAppareilsToServer(){
    this.httpClient
     .put('https://http-client-demo-960d2-default-rtdb.firebaseio.com/appareils.json', this.appareils)
     .subscribe(
       () =>{
         console.log('Enregistrement terminé !');
       },
       (error) => {
         console.log('Erreur de sauvegarde ! ' + error);
       }
     )
  }

  getAppareilsFromServer(){
    this.httpClient
        .get<any[]>('https://http-client-demo-960d2-default-rtdb.firebaseio.com/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response; //Recuperer les appareils du serveur 
            this.emitAppareilSubject(); // Emettre les appareils
          },
          (error) => {
            console.log('Erreur de chargement !' + error)
          }
        );
  }

}