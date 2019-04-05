import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBModalComponent } from './modal-padrao/modal-padrao.component';
import { MDBModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [MDBModalComponent, MDBModalConfirmacaoComponent],
  exports: [MDBModalComponent, MDBModalConfirmacaoComponent],
  entryComponents: [MDBModalConfirmacaoComponent]
})
export class MDBModalModule { }
