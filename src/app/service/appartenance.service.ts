import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appartenance } from '../model/appartenance';


const STUB_DATA: Appartenance[] = [
  {caption: "Commun", id:"1"},
  {caption: "Nadège", id:"2"},
  {caption: "Jean", id:"3"},
  {caption: "Thomas", id:"4"}
];


@Injectable({
  providedIn: 'root'
})

export class AppartenanceService {


  constructor() { }

  public getAppartenances() : Observable<Appartenance[]> {
    return of(STUB_DATA);
  }
}
