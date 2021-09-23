import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { SyntheseComponent } from './components/synthese/synthese.component';

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
