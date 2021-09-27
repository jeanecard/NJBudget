import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompteModel } from '../model/compte-model';
import { CompteOperationModel } from '../model/compte-operation-model';
import { StateCompte } from '../model/state-compte';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private _userService : UserService, 
    private _http: HttpClient) { }

  addOperation(input : CompteOperationModel) : Observable<CompteModel>{
    //TODO _userService
    return this._http.post<CompteModel>("https://njbudgetwbackend.azurewebsites.net​/api/Operation/add-operation", input);
    // return this._http.post<CompteModel>("https://localhost:44385/api/Operation/add-operation", input);
  }
 
  
  removeOperation(input : CompteOperationModel) : Observable<CompteModel>{
    return this._http.post<CompteModel>("https://njbudgetwbackend.azurewebsites.net/api/Operation/remove-operation", input);
  }

  deleteOperation(idOperation: string) : Observable<CompteModel |null>{
    //TODO _userService
  
    return of(null);
  }
}
