import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'grille paim',
      status: null
    }
  ];

  constructor(private httpClient: HttpClient){}

  saveAppareilsToServer(){
    this.httpClient
      .put('https://mon-projet-angular-f0588-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('enregistrement terminé');
        },
        (error) => {
          console.log('Erreur !: ' + error);
        }
      )
  }

  getAppareilsFromServer(){
    this.httpClient
      .get<any[]>('https://mon-projet-angular-f0588-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      )
  }
  
  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    //  La ligne pour l'id prend l'id du dernier élément actuel de l'array et ajoute 1.
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  // créer une méthode qui, quand le service reçoit de nouvelles données,
  // fait émettre ces données par le Subject 
  // et appeler cette méthode dans toutes les méthodes qui en ont besoin ;
  emitAppareilSubject(){
    // slice() method extracts a section of an array and returns a new array.
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
      this.emitAppareilSubject();
    }
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }
}
