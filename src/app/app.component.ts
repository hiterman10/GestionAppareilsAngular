import { Component, OnDestroy, OnInit } from '@angular/core';
import {  interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy  {

  secondes: number;
  counterSubscription: Subscription

  constructor() {}

  ngOnInit() {
    //creation du compteur
    const counter = interval(1000);

   /*  counter.subscribe(
      (value: number) => {
        this.secondes = value ;
      },
      (error: any) => {
        console.log('Une erreur a été rencontrée !');
      },
      () => {
        console.log('Observable complétée !');
      }
    ); */

    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value ;
      },
    );
    
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }

}
