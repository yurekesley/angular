import { Injectable, Inject } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { ROTA_INICIO } from '../provedores/bootstrap.provider';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UtilServico {
  public timeoutSessaoExpirada = 5;
  constructor(
    @Inject(ROTA_INICIO) public rotaInicio: string,
    private route: Router
  ) {}

  public decidirRotaInicio(nomeAplicacao: string, rotaInicio: string): any {
    const session = JSON.parse(
      sessionStorage.getItem('[' + nomeAplicacao + ':SSO]')
    );
    if (session && session.rota !== ROTA_INICIO) {
      this.route.navigateByUrl(session.rota);
      return;
    }
    this.route.navigateByUrl(this.rotaInicio);
  }
}

export function buscarValor(item: any, atributo: any, retornoDefault = null) {
  if (item && atributo) {
    if (typeof atributo === 'number' || atributo.indexOf('.') === -1) {
      return item[atributo] ? item[atributo] : retornoDefault;
    } else {
      const fields: string[] = atributo.split('.');
      let value = item;
      for (let i = 0, len = fields.length; i < len; ++i) {
        if (value == null) {
          return retornoDefault;
        }
        value = value[fields[i]];
      }
      return value ? value : retornoDefault;
    }
  } else {
    return retornoDefault;
  }
}
/*
export function guardarRota(nomeAplicacao: string, usuario?: Usuario): any {
  sessionStorage.clear();
  const rota: string = buscarValor(window.location.href.split('#'), 1);
  const objeto = {
    rota: rota,
    usuario: usuario
  };
  sessionStorage.setItem('[' + nomeAplicacao + ':ONLOAD]', JSON.stringify(objeto));
}

export function sessaoExpirada(nomeAplicacao: string) {
  sessionStorage.setItem('[' + nomeAplicacao + ':SSO]', 'SESSÃO EXPIRADA');
}
*/
