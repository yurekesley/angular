import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBTabelaComponent } from './tabela.component';
import { MDBColunaComponent } from './coluna/coluna.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { MDBGridModule } from '../grid/grid.module';

@NgModule({
  imports: [
    CommonModule, 
    MatTableModule,
    MatSortModule,
    MDBGridModule, 
    MatPaginatorModule, 
    MatTooltipModule, 
    MatCheckboxModule
  ],
  declarations: [MDBTabelaComponent, MDBColunaComponent],
  exports: [MDBTabelaComponent, MDBColunaComponent]
})
export class MDBTabelaModule { }
