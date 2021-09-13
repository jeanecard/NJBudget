import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StateCompte } from '../model/state-compte';

@Injectable({
  providedIn: 'root'
})
export class DisplayConfigurationService {

  constructor() { }

  public getBackgroundColor(state : StateCompte) : string{
    if(state === StateCompte.Warnning){
      return "rgba(255,103,0,0.2)";
    } else if(state === StateCompte.Danger){
      return "rgba(255,0,0,0.2)";
    }
    else if(state === StateCompte.Shame){
      return "rgba(0,0,0,0.2)";
    } else if(state === StateCompte.Good){
      return "rgba(0,250,0,0.2)";
    } else{
      return "";
    }
  }

  public getBorderColor(state : StateCompte) : string{
    if(state === StateCompte.Warnning){
      return "rgba(255,153,0,4)";
    } else if(state === StateCompte.Danger){
      return "rgba(255,0,0,0.4)";
    }
    else if(state === StateCompte.Shame){
      return "rgba(255,255,255,0.4)";
    } else if(state === StateCompte.Good){
      return "rgba(0,102,34,0.4)";
    } else{
      return "";
    }
  }

  public getExpectedColor() : string{
    return 'rgba(179,181,198,0.2)';
  }
}
