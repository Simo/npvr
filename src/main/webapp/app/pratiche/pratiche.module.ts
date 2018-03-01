import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { PraticheRoutingModule } from './pratiche-routing.module';
import { PraticheComponent } from './pratiche.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    PraticheRoutingModule
  ],
  declarations: [PraticheComponent]
})
export class PraticheModule { }
