import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBNavbarComponent } from './navbar.component';
import { MatToolbarModule,
         MatIconModule } from '@angular/material';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [MDBNavbarComponent],
  exports: [
    MDBNavbarComponent
  ]
})
export class MDBNavbarModule { }
