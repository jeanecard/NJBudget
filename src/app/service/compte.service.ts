import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompteModel } from '../model/compte-model';
import { CompteOperationModel } from '../model/compte-operation-model';
import { OperationType } from '../model/operation-type';
import { StateCompte } from '../model/state-compte';


const STUB_DATA: CompteModel[] = [
  {
    id:"1", 
    caption:"Electrécité", 
    budgetExpected:280, 
    budgetLeft:200, 
    budgetSpent:80 , 
    groupId:"1",
    state:StateCompte.Warnning,
    operationAllowed: OperationType.AddAndDelete,
    operations:[
      {id:"1", compteId:"1", dateOperation:new Date(2021,9,17), value:80, caption:'frais de service'}
    ]},
  {
    id:"2", 
    caption:"Nourriture", 
    budgetExpected:280, 
    budgetLeft:200, 
    budgetSpent:80, 
    groupId:"1", 
    state:StateCompte.Warnning,
    operationAllowed: OperationType.DeleteOnly,
  operations:[
    {id:"1", compteId:"2", dateOperation:new Date(2021,9,17), value:40,caption:'Biocoop'},
    {id:"2", compteId:"2", dateOperation:new Date(2021,9,18), value:40,caption:'Carrefour'}
  ]}  
];
@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor() { }

  getCompte(id:string) : Observable<CompteModel> {
    return of(STUB_DATA[0]);
  }

  getComptes() : Observable<CompteModel[]> {
    return of(STUB_DATA);
  }

  addOperation(input : CompteOperationModel, compte : CompteModel) : Observable<CompteModel>{
    if(compte)
    {
      compte.operations.push(input);
      compte.budgetLeft += input.value;
      compte.budgetSpent -= input.value;

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
    if(compte)
    {
      compte.operations.push(input);
      compte.budgetLeft -= input.value;
      compte.budgetSpent += input.value;
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
}
