import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {ChartModule} from 'primeng/chart';

import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { SyntheseComponent } from './synthese/synthese.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DepenseComponent } from './components/depense/depense.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    SyntheseComponent,
    DepenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule, 
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    ChartModule,
    MatProgressBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatAutocompleteModule,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
