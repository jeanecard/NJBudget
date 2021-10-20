import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {UserRoutingModule} from './user-routing.module'
import { CoreModule } from '../core/core.module';
import {UserComponent} from './component/user.component'

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    MatInputModule, 
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,    
    MatDialogModule,
    MatToolbarModule,
    MatStepperModule,
    MatAutocompleteModule,
    CoreModule 
  ],
  exports: [
    UserComponent    
  ]
})
export class UserModule { }
