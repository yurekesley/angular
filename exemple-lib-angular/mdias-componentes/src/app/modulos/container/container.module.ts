import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { MDBContainerComponent } from './container.component';
import { MDBGridModule } from '../grid/grid.module';
import { MDBTituloComponent } from './titulo/titulo.component';
import { MDBSubTituloComponent } from './sub-titulo/sub-titulo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MDBGridModule
  ],
  declarations: [MDBContainerComponent, MDBTituloComponent, MDBSubTituloComponent],
  exports: [
    MDBContainerComponent,
    MDBTituloComponent,
    MDBSubTituloComponent
  ]
})
export class MDBContainerModule { }
