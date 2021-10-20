import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompteModel } from '../model/compte-model';
import { CompteOperationModel } from '../model/compte-operation-model';
import { StateCompte } from '../model/state-compte';
import { InitialisationService } from './initialisation.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor( 
    private _initService : InitialisationService,
    private _http: HttpClient) { }

  addOperation(input : CompteOperationModel) : Observable<CompteModel>{
    return this._http.post<CompteModel>(
      //"https://localhost:44385/api/Operation/add-operation",
      "https://njbudgetwbackend.azurewebsites.net​/api/Operation/add-operation", 
      input);
  }
 
  
  removeOperation(input : CompteOperationModel) : Observable<CompteModel>{
    return this._http.post<CompteModel>(
      //"https://localhost:44385/api/Operation/remove-operation",
      "https://njbudgetwbackend.azurewebsites.net/api/Operation/remove-operation", 
      input);
  }

  deleteOperation(idOperation: string) : Observable<CompteModel>{
    return this._http.delete<CompteModel>(
      "https://njbudgetwbackend.azurewebsites.net/api/Operation/delete-operation/" +idOperation);
 
  }
}
