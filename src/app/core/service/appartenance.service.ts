import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appartenance, AppartenanceUI } from '../model/appartenance';


@Injectable({
  providedIn: 'root'
})

export class AppartenanceService {

  constructor(private _http: HttpClient) {
   }

  public getAppartenances(): Observable<Appartenance[]> {
    
    //return this._http.get<Appartenance[]>("https://localhost:44385/api/Appartenance");
     return this._http.get<Appartenance[]>("https://njbudgetwbackend.azurewebsites.net/api/Appartenance");
    
  }
}
