import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyntheseComponent } from './components/synthese/synthese.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SyntheseRoutingModule } from './synthese-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    SyntheseComponent
  ],
  imports: [
    SyntheseRoutingModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    NgApexchartsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,    
    MatProgressSpinnerModule,    
    CoreModule 
  ],
  exports: [
    SyntheseComponent    
  ]
})
export class DepenseSyntheseModule { }
