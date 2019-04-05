import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimaryOutletRoutingModule } from './primary-outlet-routing.module';
import { PrimaryOutletComponent } from './primary-outlet.component';

@NgModule({
  declarations: [PrimaryOutletComponent],
  imports: [
    CommonModule,
    PrimaryOutletRoutingModule
  ]
})
export class PrimaryOutletModule { }
