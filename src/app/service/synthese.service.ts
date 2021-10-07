import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StateCompte } from '../model/state-compte';
import { SyntheseDepenseByAppartenanceModel } from '../model/synthese-depense-by-appartenance-model';
import { SyntheseDepenseGlobal } from '../model/synthese-depense-global';
import { SyntheseDepenseModel } from '../model/synthese-depense-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor(private _userService : UserService, private _http: HttpClient) { }

  public getExpenseGroupByAppartenance() : Observable<SyntheseDepenseModel>{
    //TODO _userService
    return this._http.get<SyntheseDepenseModel>("https://njbudgetwbackend.azurewebsites.net/api/Synthese/ByAppartenance/");
  }

  public getExpenseGroupByGroups(appartenanceId : string) : Observable<SyntheseDepenseByAppartenanceModel>{
    return this._http.get<SyntheseDepenseByAppartenanceModel>("https://njbudgetwbackend.azurewebsites.net/api/Synthese/ForAppartenance/" + appartenanceId);
  }

  public getExpenseGlobal() : Observable<SyntheseDepenseGlobal>{
    return this._http.get<SyntheseDepenseGlobal>("https://njbudgetwbackend.azurewebsites.net/api/Synthese/SyntheseMois");
  }

  

}
