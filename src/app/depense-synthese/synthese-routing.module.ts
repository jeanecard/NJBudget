import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SyntheseComponent } from './components/synthese/synthese.component';




const routes: Routes = [
  {
    path: '',
    component: SyntheseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})export class SyntheseRoutingModule { }
