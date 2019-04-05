import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBColComponent } from './col/col.component';
import { MDBAcoesComponent } from './acoes/acoes.component';
import { MDBRowComponent } from './row/row.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MDBColComponent, MDBAcoesComponent, MDBRowComponent],
  exports: [MDBColComponent, MDBAcoesComponent, MDBRowComponent]
})
export class MDBGridModule { }
