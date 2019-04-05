import { MdbHttpService } from './../http/mdb-http.service';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { MDBHttp } from '../http/mdb-http';
import { ACSPermissoes } from './permissoes';
import { JsonResult } from '../../modelo/json-result';

@Injectable({ providedIn: 'root' })
export class MdbAcsServico {

  constructor(private mdbHTTP: MdbHttpService) { }

  public ehPermitidoExclusao(funcao: string): Observable<boolean> {
    return this.mdbHTTP.post<JsonResult>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
      .pipe(
        map((acessosDoGrupo: any) => {
          for (const acessoGrupo of acessosDoGrupo) {
            const permissoes = ACSPermissoes.excluir.niveis.filter(nivel => nivel === acessoGrupo.nivel);
            if (permissoes && permissoes.length > 0) {
              return true;
            }
          }
          return false;
        }),
        catchError((httpError) => {
          return throwError(httpError);
        })
      );
  }

  public ehPermitidoAlteracao(funcao: string): Observable<boolean> {
    return this.mdbHTTP.post<JsonResult>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
      .pipe(
        map((acessosDoGrupo: any) => {
          for (const acessoGrupo of acessosDoGrupo) {
            const permissoes = ACSPermissoes.alterar.niveis.filter(nivel => nivel === acessoGrupo.nivel);
            if (permissoes && permissoes.length > 0) {
              return true;
            }
          }
          return false;
        }),
        catchError((httpError) => {
          return throwError(httpError);
        })
      );
  }

  public ehPermitidoInclusao(funcao: string): Observable<boolean> {
    return this.mdbHTTP.post<JsonResult>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
      .pipe(
        map((acessosDoGrupo: any) => {
          for (const acessoGrupo of acessosDoGrupo) {
            const permissoes = ACSPermissoes.incluir.niveis.filter(nivel => nivel === acessoGrupo.nivel);
            if (permissoes && permissoes.length > 0) {
              return true;
            }
          }
          return false;
        }),
        catchError((httpError) => {
          return throwError(httpError);
        })
      );
  }

  public ehPermitidoConsultar(funcao: string): Observable<boolean> {
    return this.mdbHTTP.post<JsonResult>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
      .pipe(
        map((acessosDoGrupo: any) => {
          for (const acessoGrupo of acessosDoGrupo) {
            const permissoes = ACSPermissoes.consultar.niveis.filter(nivel => nivel === acessoGrupo.nivel);
            if (permissoes && permissoes.length > 0) {
              return true;
            }
          }
          return false;
        }),
        catchError((httpError) => {
          return throwError(httpError);
        })
      );
  }

  public acessoGrupoPossuiVinculo(funcao: string): Observable<boolean> {
    return this.mdbHTTP.post<JsonResult>(new MDBHttp('acesso/consultar/funcoes'), [funcao])
      .pipe(
        map((acessosDoGrupo: any) => {
          return acessosDoGrupo && acessosDoGrupo.length > 0;
        }),
        catchError((httpError) => {
          return throwError(httpError);
        })
      );
  }
}

