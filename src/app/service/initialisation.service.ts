import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitialisationService {
  
  
  public getUserToken() : string | null {
    return "saucise";
  }

  public getUserName() : string {
    return "Jean";
  }

  constructor() { }
}
