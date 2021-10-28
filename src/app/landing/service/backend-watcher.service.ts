import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendWatcherService {

  private _backendEventGenerator = new Subject<boolean>();
  private _isBackendAlive = false;

  constructor() {
   }

  public setBackendIsUp(){
    this._backendEventGenerator.next(true);
  }

  public getBackIsUpObservable() : Observable<boolean> {
    return this._backendEventGenerator.asObservable();
  }
}
