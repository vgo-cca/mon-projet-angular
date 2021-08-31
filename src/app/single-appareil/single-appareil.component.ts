import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {
  name: string|undefined = 'Appareil';
  status: string|null|undefined = 'Statut';

  constructor( 
    private appareilService: AppareilService,
    private actifRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // ActivatedRoute permet de récupérer le fragment  id  de l'URL :
    const id = this.actifRoute.snapshot.params['id'];
    // +id permet de transformer le type de id qui est une string en un nombre
    this.name = this.appareilService.getAppareilById(+id)?.name;
    this.status = this.appareilService.getAppareilById(+id)?.status;
  }
}