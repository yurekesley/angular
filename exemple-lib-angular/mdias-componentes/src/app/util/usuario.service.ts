import { MenuItem } from './../modelo/menu-item';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, APP_ID } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { URL_SERVIDOR } from '../provedores/bootstrap.provider';
import { MdbHttpService } from '../modulos/http/mdb-http.service';
import { MDBHttp } from '../modulos/http/mdb-http';
import { JsonResult } from '../modelo/json-result';

@Injectable({providedIn: 'root'})
export class UsuarioServico  {

  constructor(
    private http: HttpClient,
    private mdbHTTP: MdbHttpService,
    @Inject(APP_ID) public nomeSistema: string,
    @Inject(URL_SERVIDOR) public urlServidor: string) { }

  public buscarUsuario(): Observable<Usuario> {
    const opcoes = new MDBHttp('seguranca/login', {comLoading: false});
    return this.mdbHTTP.get<any>(opcoes).pipe(
      tap(() => {})
      , map(
        resposta => JsonResult.is(resposta) ? resposta.data.usuario : resposta.usuario
      )
    );
  }

  public buscarMenu() : Observable<MenuItem[]> {
   const opcoes = new MDBHttp('menu/listar', {comLoading: false});
    return  this.mdbHTTP.get<any>(opcoes)
    .pipe(tap(() => {}));
  }

  public deslogar() {
      const url = window.location.href.split('#')[0].split('//')[1];
      if (url.includes('wlsistemas')) {
        let irPara = '';
        if ( url.startsWith('dev')) {
          irPara = 'https://oamdev.mdb.com.br/oam/server/logout?end_url=' + window.location.href.split('#')[0];
        } else if (url.startsWith('hom')){
          irPara = 'https://oamhom.mdb.com.br/oam/server/logout?end_url=' + window.location.href.split('#')[0];
        } else {
          irPara = 'https://oam.mdb.com.br/oam/server/logout?end_url=' + window.location.href.split('#')[0];
        }
        window.location.href = irPara;
      }
  }
}
