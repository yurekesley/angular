import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, } from 'rxjs/operators';

import { Pageable } from '../../modelo/pageable';
import { MDBHttp } from './mdb-http';
import { MdbMensagemHttp } from './mdb-mensagem-http';
import { JsonResult } from '../../modelo/json-result';
import { URL_SERVIDOR } from '../../provedores/bootstrap.provider';
import { MDBLoadService } from '../../util/mdb-load.service';
import { MDBI18NService } from '../i18n/i18n.service';

class EnumMetodo {
  static SALVAR = 1;
  static EDITAR = 2;
  static DELETAR = 3;
}

@Injectable({providedIn: 'root'})
export class MdbHttpService {

  constructor(
                private http: HttpClient
              , private i18nService: MDBI18NService
              , private loadService: MDBLoadService
              , @Inject(URL_SERVIDOR) public urlServidor?: string) {}

  private sucesso(opcoes: MDBHttp) {
    if (opcoes.comLoading){
      this.loadService.mostrar = false;
    }
  }

  private sucessoGenericos(opcoes: MDBHttp, metodo: EnumMetodo) {
    this.loadService.mostrar = false;
    this.mensagemSucesso(metodo);
  }

  private url(rest: string): string {
    if (rest){
        return this.urlServidor + '/' + rest;
    }
    return this.urlServidor;
}

  public get<T>(opcoes: MDBHttp): Observable<T> {
    if (opcoes.comLoading){
      this.loadService.mostrar = true;
    }
    return this.http.get<T>(this.url(opcoes.rest), opcoes.options)
    .pipe(
      tap(
            (resposta: any) => {
              this.sucesso(opcoes);
             }
        ),
        map(resposta => {
        if (JsonResult.is(resposta)){
          return resposta.data;
        }
        return resposta;
      })
    );
  }

  public post<T>(opcoes: MDBHttp, objeto: any): Observable<T>{
    const toAdd = objeto;
    if (opcoes.comLoading){
      this.loadService.mostrar = true;
    }
    return this.http.post<T>(this.url(opcoes.rest), toAdd, opcoes.options)
    .pipe(
      tap(
        (resposta: any) => {
          this.sucesso(opcoes);
        }
      ),
      map(resposta => {
        if (JsonResult.is(resposta)){
          return resposta.data;
        }
        return resposta;
      })
    );
  }

  public put<T>(opcoes: MDBHttp, objeto: any ): Observable<T> {
    if (opcoes.comLoading) {
      this.loadService.mostrar = true;
    }
    return this.http.put<T>(this.url(opcoes.rest) , JSON.stringify(objeto), opcoes.options)
    .pipe(
      tap(
          (resposta: any) => {
                this.sucesso(opcoes);
          }
      ),
      map(resposta => {
        if (JsonResult.is(resposta)){
          return resposta.data;
        }
        return resposta;
      })
    );
  }

  public delete<T>(opcoes: MDBHttp, id: number): Observable<T> {
    if (opcoes.comLoading){
      this.loadService.mostrar = true;
    }
    return this.http.delete<T>(this.url(opcoes.rest) + '/' + id, opcoes.options)
    .pipe(
      tap(
        (resposta: any) => {
          this.sucesso(opcoes);
        }
      ),
      map(resposta => {
        if (JsonResult.is(resposta)){
          return resposta.data;
        }
        return resposta;
      })
    );
  }

  public getRecursoAssets<T>(caminho): Observable<T> {
    return this.http.get<T>('assets/' + caminho );
  }

  public salvar(rest: string, entidade: any): Observable<any> {
    let opcoes: MDBHttp;
    if (entidade && entidade.id){
      opcoes = new MDBHttp((rest + '/atualizar'));
      return this.put(opcoes, entidade).pipe(
        tap(() => this.sucessoGenericos(opcoes, EnumMetodo.EDITAR))
      );
    } else {
      opcoes = new MDBHttp((rest + '/salvar'));
      return this.post(opcoes, entidade).pipe(
        tap(() => this.sucessoGenericos(opcoes, EnumMetodo.SALVAR))
      );
    }
  }

  public salvarLista(rest: string, lista: Array<any>, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/salvar/lista'));
    return this.post(opcoes, lista).pipe(
      tap(() => this.sucessoGenericos(opcoes, EnumMetodo.SALVAR))
    );
  }

  public atualizarLista(rest: string, lista: Array<any>, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/atualizar/lista'));
    return this.post(opcoes, lista).pipe(
      tap(() => this.sucessoGenericos(opcoes, EnumMetodo.EDITAR))
    );
  }

  public deletar(rest: string, id: any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/deletar'));
    return this.delete(opcoes, id).pipe(
      tap(() => this.sucessoGenericos(opcoes, EnumMetodo.DELETAR))
    );
  }

  public deletarPorObjeto(rest: string, entidade: any, mensagem: MdbMensagemHttp = new MdbMensagemHttp()): Observable<any> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/deletar'));
    return this.post(opcoes, entidade).pipe(
      tap(() => this.sucessoGenericos(opcoes, EnumMetodo.DELETAR))
    );
  }

  public consultarPorId<T>(rest: string, id: any): Observable<T> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/consultar/' + id));
    return this.get<T>(opcoes);
  }

  public consultarPorObjeto<T>(rest: string, entidade: T): Observable<T> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/consultar'));
    return this.post<T>(opcoes, entidade);
  }

  public consultarPaginado<T>(rest: string, entidade: any, parametros: HttpParams): Observable<Pageable<T>> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/consultar/paginado'));
    opcoes.params = parametros;

    const jsonEntidade = JSON.stringify(entidade);
    return this.post<Pageable<T>>(opcoes, jsonEntidade);
  }

  public consultarTodos<T>(rest: string): Observable<Array<T>> {
    const opcoes: MDBHttp = new MDBHttp((rest + '/consultar/todos'));
    return this.get<Array<T>>(opcoes);
  }

  private mensagemSucesso(enumMetodo: EnumMetodo): string {
    if (enumMetodo === EnumMetodo.SALVAR) {
      return this.i18nService.translate('mdbComponentes.operacao.sucesso.salvar');
    }
    if (enumMetodo === EnumMetodo.EDITAR) {
      return this.i18nService.translate('mdbComponentes.operacao.sucesso.editar');
    }
    if (enumMetodo === EnumMetodo.DELETAR) {
      return this.i18nService.translate('mdbComponentes.operacao.sucesso.deletar');
    }
  }
}


