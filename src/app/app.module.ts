import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwtInterceptor';
import { BackendWatcherService } from './landing/service/backend-watcher.service';



function wakeupBackendInitializeAppFactory(httpClient: HttpClient, service : BackendWatcherService): any {
  httpClient.get<any[]>("https://njbudgetwbackend.azurewebsites.net/api/Appartenance").subscribe(
    (data => {
      service.setBackendIsUp();
  })
  );
  return () => {}
 }


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    MatToolbarModule, 
    RouterModule, 
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: () => initializeApp, deps: [HttpClient], multi: true }    
    {
      provide: APP_INITIALIZER,
      useFactory: wakeupBackendInitializeAppFactory,
      deps: [HttpClient, BackendWatcherService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
