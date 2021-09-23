import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompteModel } from '../model/compte-model';
import { Group } from '../model/group';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _userService: UserService , private _http: HttpClient) { }
// passer par interceptor pour ajouter le token dans le header de la requêtehttp;-)
  public getGroups(idAppartenance: string): Observable<Group[]> {
    //TODO _userService
    return this._http.get<Group[]>("https://njbudgetwbackend.azurewebsites.net/api/Group/ByIdAppartenance/" + idAppartenance);
    //return this._http.get<Group[]>("https://localhost:44385/api/Group/ByIdAppartenance/" + idAppartenance);
  }

  public getGroup(idGroup: string) : Observable<CompteModel>{
    return this._http.get<CompteModel>("https://njbudgetwbackend.azurewebsites.net/api/Group/ById/" + idGroup);
  }
}
