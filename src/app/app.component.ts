import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mon-projet-angular';
  isAuth = false;
  
  secondes!: number;
  counterSubscription!: Subscription;

  constructor( public appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit(){
    // l'observable
    // interval() crée un Observable qui émet un chiffre croissant à intervalles réguliers et
    // prend le nombre de millisecondes souhaité pour l'intervalle comme argument.
    let counter = interval(1000);

    // l'observer ( subscribe() )
    // L'Observable émet trois types d'informations : des données, une erreur, ou un message complete.
    // Afin d'éviter tout problème, quand vous utilisez des Observables personnalisés,
    // il est vivement conseillé de stocker la souscription dans un objet Subscription
    this.counterSubscription = counter.subscribe(
      (value) =>{
        this.secondes = value;
      },
      (error) => {
        console.log('il y a une erreur');
        console.log(error);
      },
      () => {
        console.log('observer complete');
      }
    );
  }

  ngOnDestroy() {
    //  La fonction  unsubscribe()  détruit la souscription et
    // empêche les comportements inattendus liés aux Observables infinis,
    // donc n'oubliez pas de unsubscribe !
    this.counterSubscription.unsubscribe();
  }

}
