import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'; // Utiliser pour les observables
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {  

  isAuth = false;

  /*   lastUpdate =new Date() */

  lastUpdate = new Promise<Date>(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(
        () => {
          resolve(date);
        }, 2000
      );
    }
  )

  appareils: any[];
  appareilSubscription: Subscription;

  // ce constructeur active le bouton tout allumer apres 4secondes
  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit() {
    // cette methode permet d'aller chercher les informations
    //this.appareils = this.appareilService.appareils;
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    /* console.log('On allume tout !'); */
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    /* console.log('On allume tout !'); */
    this.appareilService.switchOffAll();
  }
  onSave(){
    this.appareilService.saveAppareilsToServer();
  }
  onFetch() { //recupere les donnees du serveur 
    this.appareilService.getAppareilsFromServer();
  }
}
