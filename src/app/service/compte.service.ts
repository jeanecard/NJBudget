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

  addOperation(input : CompteOperationModel, compte : CompteModel) : Observable<CompteModel>{
    //TODO _userService
    if(compte)
    {
      compte.operations.push(input);
      compte.budgetLeft += input.value;
      compte.budgetLeft -= input.value;

      const stepLimit = compte.budgetExpected / 10;
      compte.state = StateCompte.Good;
      if(compte.budgetLeft <= stepLimit &&  compte.budgetLeft >=0 ){
        compte.state = StateCompte.Warnning;
      }
      else if(compte.budgetLeft < 0){
        compte.state = StateCompte.Danger;
      }      
    }
    return of(compte);
  }

  removeOperation(input : CompteOperationModel, compte : CompteModel) : Observable<CompteModel>{
    //TODO _userService

    if(compte)
    {
      compte.operations.push(input);
      compte.budgetLeft -= input.value;
      compte.budgetLeft += input.value;
      const stepLimit = (3 * compte.budgetExpected) / 10;
      compte.state = StateCompte.Good;
      if(compte.budgetLeft <= stepLimit &&  compte.budgetLeft >=0 ){
        compte.state = StateCompte.Warnning;
      }
      else if(compte.budgetLeft < 0){
        compte.state = StateCompte.Danger;
      }
    }
    return of(compte);
  }

  deleteOperation(idOperation: string) : Observable<CompteModel |null>{
    //TODO _userService
  
    return of(null);
  }
}
