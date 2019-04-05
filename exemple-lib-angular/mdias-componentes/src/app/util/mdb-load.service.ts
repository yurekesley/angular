import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MDBLoadService {

  private _mostrar = false;

  get mostrar(): boolean {
    return this._mostrar;
  }

  set mostrar(flag: boolean) {
    this._mostrar = flag;
  }
}
