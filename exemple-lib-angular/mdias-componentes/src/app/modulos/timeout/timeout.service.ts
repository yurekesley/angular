import { MdbHttpService } from './../http/mdb-http.service';
import { Injectable } from '@angular/core';
import { UsuarioServico } from '../../../../publico/servicos';
import { MDBHttp } from '../http/mdb-http';

const TEMPO_PADRAO = 1800;

@Injectable({providedIn: 'root'})
export class MDBTimeoutServico {

  private _tempoRestante: number = TEMPO_PADRAO;

  constructor(
    private usuarioService: UsuarioServico,
    private mdbHTTP: MdbHttpService) {
    this.updateTimer();
  }

  public reset() {
    this._tempoRestante = TEMPO_PADRAO;
  }

  public manterSessao() {
    const opcoes = new MDBHttp('app/info', {comLoading: false});
    this.mdbHTTP.get<any>(opcoes);
  }

  public get tempoRestante() {
    return this._tempoRestante;
  }

  private updateTimer() {
    if (this._tempoRestante < 0) {
      this.usuarioService.deslogar();
    } else {

      this.umSegundo().then(() => {
        this._tempoRestante --;
        this.updateTimer();
      });
    }
  }

  private umSegundo() {
      return new Promise( resolve => setTimeout(resolve, 1000) );
  }
}
