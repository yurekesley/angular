import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'mdb-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class MDBModalConfirmacaoComponent {

  constructor(public dialogRef: MatDialogRef<MDBModalConfirmacaoComponent>,
              @Inject(MAT_DIALOG_DATA) public mensagem: string) { 
  }
  
  sim() {
    this.dialogRef.close(true);
  }

  nao() {
    this.dialogRef.close(false);
  }
}
