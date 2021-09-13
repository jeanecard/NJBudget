import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StateCompte } from '../model/state-compte';
import { SyntheseDepenseModel } from '../model/synthese-depense-model';

const STUB_DATA_EXPENSE_GROUP_BY_APPARTENANCE: SyntheseDepenseModel = {
  state: StateCompte.Warnning,
  data:[
{appartenanceId:"1", groupId:null, appartenanceCaption:"Commun", groupCaption:null, budgetPourcentageDepense:75, budgetValueDepense:950, budgetValuePrevu:1200, state:StateCompte.Warnning},
{appartenanceId:"2", groupId:null, appartenanceCaption:"Jean", groupCaption:null, budgetPourcentageDepense:15, budgetValueDepense:150, budgetValuePrevu:120, state:StateCompte.Good},
{appartenanceId:"3", groupId:null, appartenanceCaption:"Nadège", groupCaption:null, budgetPourcentageDepense:55, budgetValueDepense:50, budgetValuePrevu:20, state:StateCompte.Shame},
{appartenanceId:"4", groupId:null, appartenanceCaption:"Thomas", groupCaption:null, budgetPourcentageDepense:120, budgetValueDepense:1200, budgetValuePrevu:1100, state:StateCompte.Danger}
  ]
};

@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor() { }

  public getExpenseGroupByAppartenance() : Observable<SyntheseDepenseModel>{
    return of(STUB_DATA_EXPENSE_GROUP_BY_APPARTENANCE);
  }

}
