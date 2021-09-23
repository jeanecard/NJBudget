import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitialisationService {
  
  
  public getUserToken() : string | null {
    return "saucise";
  }

  constructor() { }
}
