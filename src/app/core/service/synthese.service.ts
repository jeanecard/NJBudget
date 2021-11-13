import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SyntheseDepenseByAppartenanceModel } from '../model/synthese-depense-by-appartenance-model';
import { SyntheseDepenseGlobal } from '../model/synthese-depense-global';
import { SyntheseDepenseModel } from '../model/synthese-depense-model';

@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor(private _http: HttpClient) { }

  public getExpenseGroupByAppartenance(date: Date): Observable<SyntheseDepenseModel> {
    //TODO _userService
    return this._http.get<SyntheseDepenseModel>("https://njbudgetwbackend.azurewebsites.net/api/Synthese/ByAppartenance/"
      + this.getDateUrlPart(date)
    );
  }

  public getExpenseGroupByGroups(appartenanceId: string, date: Date): Observable<SyntheseDepenseByAppartenanceModel> {
    return this._http.get<SyntheseDepenseByAppartenanceModel>(
      "https://njbudgetwbackend.azurewebsites.net/api/Synthese/ForAppartenance/"
      + appartenanceId
      + "/"
      + this.getDateUrlPart(date)
    );

  }

  public getExpenseGlobal(date: Date): Observable<SyntheseDepenseGlobal> {
    return this._http.get<SyntheseDepenseGlobal>("https://njbudgetwbackend.azurewebsites.net/api/Synthese/SyntheseMois/"
      +
      this.getDateUrlPart(date));
  }

  private getDateUrlPart(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + "/" + month + "/" + day;
  }
}
