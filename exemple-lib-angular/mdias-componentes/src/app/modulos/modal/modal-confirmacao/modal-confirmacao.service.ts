import { OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MDBModalConfirmacaoComponent } from './modal-confirmacao.component';
import { Observable, of } from 'rxjs';


@Injectable({providedIn: 'root'})
export class MDBModalConfirmacaoService implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public abrirConfirmacao(mensagem: string = 'Você confirma esta ação?'): Observable<boolean> {
    const dialogRef = this.dialog.open(MDBModalConfirmacaoComponent, {
      width: '330px',
      disableClose: true,
      data: mensagem
    });

    return dialogRef.afterClosed();
    
  }
}
