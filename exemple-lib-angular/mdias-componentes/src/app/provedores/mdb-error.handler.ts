import { MDBLoadService } from '../util/mdb-load.service';
import { MDBStatusCode } from './../modelo/enums/mdb-status-code.enun';
import { ErrorHandler, Injectable } from '@angular/core';
import { JsonResult } from '../modelo/json-result';
import { MDBMensagemServico } from '../modulos/mensagens/mensagem.service';
import { HttpErrorResponse } from '@angular/common/http';
import { buscarValor } from '../util/util.service';

@Injectable({providedIn: 'root'})
export class MDBErrorHandler implements ErrorHandler {

  constructor(private loadService: MDBLoadService,
               private mensagem: MDBMensagemServico
  ) { }

  public mostrarMensagem(titulo: string, mensagem: string): void {
    this.mensagem.limparMensagem();
    this.mensagem.addErro(titulo, mensagem, 5000);
   }

  public handleError(error: HttpErrorResponse) {
    const hasStatusHttp: boolean = error instanceof HttpErrorResponse;
    if (hasStatusHttp) {
      const status  = buscarValor(error, 'status');
      switch (status) {
        case MDBStatusCode.FORBIDDEN:
            this.mostrarMensagem('Autorização', 'Acesso negado');
        break;
        case MDBStatusCode.NOT_FOUND:
            this.mostrarMensagem('',  'URL não encontada');
        break;
        case MDBStatusCode.INTERNAL_SERVER_ERROR:
        case MDBStatusCode.BAD_REQUEST:
        this.mostrarMensagem('', this.mensagemError(error));
        break;
      }
    }
    this.loadService.mostrar = false;
    console.log(error);
  }

  private mensagemError(error: any): string{
    let corpo = '';
    if (JsonResult.is(error)) {
      corpo = error.message;
    } else if (JsonResult.is(error.error)) {
      corpo = error.error.message;
    } else {
      corpo = error.mensagem ? error.mensagem : error.message;
    }
    return corpo ? corpo : 'Error não esperado';
  }

}
