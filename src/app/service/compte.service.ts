import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompteModel } from '../model/compte-model';
import { CompteOperationModel } from '../model/compte-operation-model';
import { StateCompte } from '../model/state-compte';
import { InitialisationService } from './initialisation.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private _userService : UserService, 
    private _initService : InitialisationService,
    private _http: HttpClient) { }

  addOperation(input : CompteOperationModel) : Observable<CompteModel>{
    //TODO _userService
    let token = this._initService.getUserToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      if(token){
        headers.set('BackgroundId', token);
      }
    let options = { headers: headers };    
    return this._http.post<CompteModel>(
      //"https://localhost:44385/api/Operation/add-operation",
      "https://njbudgetwbackend.azurewebsites.net​/api/Operation/add-operation", 
      input,
      options);
  }
 
  
  removeOperation(input : CompteOperationModel) : Observable<CompteModel>{
    let token = this._initService.getUserToken();
        let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      if(token){
        headers.set('BackgroundId', token);
      }
    let options = { headers: headers };    

    return this._http.post<CompteModel>(
      "https://njbudgetwbackend.azurewebsites.net/api/Operation/remove-operation", 
      input,
      options);
  }

  deleteOperation(idOperation: string) : Observable<CompteModel>{
    let token = this._initService.getUserToken();
        let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
      if(token){
        headers.set('BackgroundId', token);
      }
    let options = { headers: headers };    

    return this._http.delete<CompteModel>(
      "https://njbudgetwbackend.azurewebsites.net/api/Operation/delete-operation/" +idOperation , 
      options);
 
  }
}
