import { MdbHttpService } from './../modulos/http/mdb-http.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MDBHttp } from '../modulos/http/mdb-http';

@Injectable({ providedIn: 'root'})
export class EquipesResolver implements Resolve<Observable<any[]>> {
  constructor (private mdbHTTP: MdbHttpService ) {  }

  public getEquipes(): Observable<any> {
    const opcoes = new MDBHttp('equipes', {
      comLoading: false
    });
    return this.mdbHTTP.get(opcoes);
  }

  resolve(): Observable<any[]> {
    return this.getEquipes();
  }
}
