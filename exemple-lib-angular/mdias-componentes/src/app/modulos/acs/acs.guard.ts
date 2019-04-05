import { MDBMensagemServico } from '../mensagens/mensagem.service';
import { MdbHttpService } from './../http/mdb-http.service';
import { buscarValor } from './../../util/util.service';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { MDBHttp } from '../http/mdb-http';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVIDOR } from '../../provedores/bootstrap.provider';

@Injectable({ providedIn: 'root' })
export class MdbAcsGuard implements CanActivate {

  constructor(
    private mdbHTTP: MdbHttpService,
    private mensagem: MDBMensagemServico
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const funcoes = buscarValor(route, 'data.funcoes');

    if (funcoes && funcoes.length && funcoes.length > 0) {
      return this.mdbHTTP.post<Array<any>>(new MDBHttp('acesso/consultar/funcoes'), funcoes).pipe(
        map(retorno => {
          let possuiFuncao = false;
          funcoes.forEach((itemParametro: string) => {
            retorno.forEach(itemRetorno => {
              if (itemRetorno.codigoFuncao === itemParametro) {
                possuiFuncao = true;
                return;
              }
            });
            if (possuiFuncao) {
              return;
            }
          });
          if (!possuiFuncao) {
            this.mensagem.limparMensagem();
            this.mensagem.addErro('Acesso não autorizado pelo ACS', 'O Usuário não está vinculado a um grupo com permissão de acesso.');
          }
          return possuiFuncao;
        }
        ),
        catchError((httpError) => {
          return throwError(httpError);
        })
      );
    } else {
      this.mensagem.limparMensagem();
      this.mensagem.addErro('Acesso não autorizado pelo ACS', 'O Usuário não está vinculado a um grupo com permissão de acesso.');
      return of(false);
    }
  }
}
