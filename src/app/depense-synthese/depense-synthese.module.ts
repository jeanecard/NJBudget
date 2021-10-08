import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyntheseComponent } from './components/synthese/synthese.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
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

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    SyntheseComponent
  ],
  imports: [
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
  ],
  exports: [
    SyntheseComponent    
  ]
})
export class DepenseSyntheseModule { }