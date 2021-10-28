import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendWatcherService } from './landing/service/backend-watcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NJBudget';
  constructor(private _backEndWatcherService : BackendWatcherService, private toastr: ToastrService){
    this._backEndWatcherService.getBackIsUpObservable().subscribe(
      (data : any) => this.toastr.success("Backend au rapport général !!", "NJBudget", {timeOut:1000})
    )
  }
}
