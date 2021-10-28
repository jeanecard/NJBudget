import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {UserRoutingModule} from './user-routing.module'
import {UserComponent} from './component/user.component'
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    MatInputModule, 
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,    
    CoreModule 
  ],
  exports: [
    UserComponent    
  ]
})
export class UserModule { }
