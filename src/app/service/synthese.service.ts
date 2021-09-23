import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StateCompte } from '../model/state-compte';
import { SyntheseDepenseModel } from '../model/synthese-depense-model';
import { UserService } from './user.service';

const STUB_DATA_EXPENSE_GROUP_BY_APPARTENANCE: SyntheseDepenseModel = {
  status: StateCompte.Warnning,
  data:[
{appartenanceId:"1", groupId:null, appartenanceCaption:"Commun", groupCaption:null, budgetPourcentageDepense:75, budgetValueDepense:950, budgetValuePrevu:1200, status:StateCompte.Warnning},
{appartenanceId:"2", groupId:null, appartenanceCaption:"Jean", groupCaption:null, budgetPourcentageDepense:15, budgetValueDepense:150, budgetValuePrevu:120, status:StateCompte.Good},
{appartenanceId:"3", groupId:null, appartenanceCaption:"Nadège", groupCaption:null, budgetPourcentageDepense:55, budgetValueDepense:50, budgetValuePrevu:20, status:StateCompte.Shame},
{appartenanceId:"4", groupId:null, appartenanceCaption:"Thomas", groupCaption:null, budgetPourcentageDepense:120, budgetValueDepense:1200, budgetValuePrevu:1100, status:StateCompte.Danger}
  ]
};

@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor(private _userService : UserService, private _http: HttpClient) { }

  public getExpenseGroupByAppartenance() : Observable<SyntheseDepenseModel>{
    //TODO _userService

    return of(STUB_DATA_EXPENSE_GROUP_BY_APPARTENANCE);
    //return this.http.get<Config>(this.configUrl);
  }

}
