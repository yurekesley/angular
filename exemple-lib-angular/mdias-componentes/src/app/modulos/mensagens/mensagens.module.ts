import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBMensagensComponent } from './mensagens.component';
import { MDBMensagemServico } from './mensagem.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MDBMensagensComponent],
  exports: [MDBMensagensComponent]
})

export class MDBMensagensModule { }
