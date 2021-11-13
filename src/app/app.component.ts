import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BackendWatcherService } from './landing/service/backend-watcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'NJBudget';
  @HostBinding('class') className = '';
  constructor(
    private _backEndWatcherService : BackendWatcherService, 
    private toastr: ToastrService,
    private overlay: OverlayContainer){
    this._backEndWatcherService.getBackIsUpObservable().subscribe(
      (data : any) => this.toastr.success("Backend au rapport général !!", "NJBudget", {timeOut:1000})
    );
    // const darkClassName = 'darkMode';
    // this.className = darkClassName;
    // this.overlay.getContainerElement().classList.add(darkClassName);
  }
}
