import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamsComponent } from './components/params.component';
import { ParamsRoutingModule } from './params-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ParamsComponent
  ],
  imports: [
    ParamsRoutingModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,    
    MatProgressSpinnerModule,    
    MatFormFieldModule,    
  ],
  exports: [
    ParamsComponent    
  ]
})
export class ParamsModule { }
