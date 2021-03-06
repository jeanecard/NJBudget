import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './depense-work-flow/components/home/home.component';
// import { MainComponent } from './depense-work-flow/components/main/main.component';
// import { SyntheseComponent } from './depense-synthese/components/synthese/synthese.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: 'budget', component: MainComponent },
  // { path: 'synthese', component: SyntheseComponent },
  {
    path: 'depense',
    loadChildren: () => import('./depense-work-flow/depense-work-flow.module').then(m => m.DepenseWorkFlowModule)
  },
  {
    path: 'synthese',
    loadChildren: () => import('./depense-synthese/depense-synthese.module').then(m => m.DepenseSyntheseModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./shared/Component/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'param',
    loadChildren: () => import('./params/params.module').then(m => m.ParamsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./depense-work-flow/depense-work-flow.module').then(m => m.DepenseWorkFlowModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
