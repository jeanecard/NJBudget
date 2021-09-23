import { Injectable } from '@angular/core';
import { InitialisationService } from './initialisation.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _initService : InitialisationService) { }

  public getToken() : string | null {
    let localStorageToken =  this._initService.getUserToken();
    return localStorageToken;
  }
}
