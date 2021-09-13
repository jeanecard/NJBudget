import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SyntheseComponent } from './synthese/synthese.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'budget', component: MainComponent },
  { path: 'synthese', component: SyntheseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
