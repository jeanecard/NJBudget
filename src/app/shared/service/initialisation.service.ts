import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitialisationService {
  
  
  public getUserToken() : string | null {
    let retour = localStorage.getItem("Background");
    if(retour){
      return retour;
    }
    return null;
  }

  public setUserToken(data : string) : void {
    localStorage.setItem("Background", data);
  }

  public getUserName() : string {
    let retour = localStorage.getItem("Color");
    if(retour){
      return retour;
    }
    return "";
  }

  public setUserName(data : string) : void {
    localStorage.setItem("Color", data);
  }

  constructor() { }
}
