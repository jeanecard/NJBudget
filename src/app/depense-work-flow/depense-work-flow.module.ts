import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { DepenseComponent } from './components/depense/depense.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConnectDialogComponent } from './components/connect-dialog/connect-dialog.component';
import { DepenseWorkFlowRoutingModule } from './depense-work-flow-routing.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    MainComponent,
    DepenseComponent,
    ConnectDialogComponent
  ],
  imports: [
    DepenseWorkFlowRoutingModule,
    CommonModule,
    MatInputModule, 
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    NgApexchartsModule,
    MatProgressBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,    
    MatDialogModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,    
    HttpClientModule,    
    RouterModule, 
    MatFormFieldModule,
    CoreModule
  ], 
  exports: [
    MainComponent,
    DepenseComponent,
    ConnectDialogComponent,
    ConnectDialogComponent 
  ]  
})
export class DepenseWorkFlowModule { }
