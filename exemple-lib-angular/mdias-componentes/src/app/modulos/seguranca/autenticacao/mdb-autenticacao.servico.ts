import { UsuarioServico } from './../../../util/usuario.service';
import {CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MdbAutenticacaoServico implements CanActivate  {

  constructor(private userService: UsuarioServico) {}

  public canActivate(): Observable<boolean> {
    return this.userService.buscarUsuario().pipe(
      map(e => {
        if (e) {
          return true;
        } else {
        }
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}
