import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  appareilSubscription!: Subscription;
  appareils!: any[];
  isAuth!: boolean;
  
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(public appareilService: AppareilService) {
  }

  ngOnInit(): void {
    // Si les données sont mises à jour par une autre partie de l'application,
    // l'utilisateur voie ce changement sans avoir à recharger la page.
    // Il va de même dans l'autre sens :
    // un changement au niveau du view doit pouvoir être reflété par le reste de l'application sans rechargement.
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        console.log('appareilSubscription', appareils);
        this.appareils = appareils;
      }
    )
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    }
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
}
