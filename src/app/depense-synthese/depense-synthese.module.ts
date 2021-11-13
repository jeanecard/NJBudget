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
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    SyntheseComponent
  ],
  imports: [
    SyntheseRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMomentDateModule,
    MatGridListModule,
    NgApexchartsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,    
    MatProgressSpinnerModule,    
    CoreModule,
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    //  { 
    //    provide: MAT_DATE_LOCALE, 
    //    useValue: MY_FORMATS },
  ],
  exports: [
    SyntheseComponent    
  ]
})
export class DepenseSyntheseModule { }
