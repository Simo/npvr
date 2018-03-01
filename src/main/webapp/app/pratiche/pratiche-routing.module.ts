import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PraticheComponent} from './pratiche.component';

const routes: Routes = [
    { path: 'pratiche',
      component: PraticheComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PraticheRoutingModule { }
