import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MdbHttpService } from '../http/mdb-http.service';
import { MDBHttp } from '../http/mdb-http';

@Injectable({providedIn: 'root'})
export class FooterService {
  constructor(
      private mdbHTTP: MdbHttpService) {}

  public getVersaoSistema(): Observable<any> {
      const opcoes = new MDBHttp('app/info', {
      comLoading: false
    });
   return this.mdbHTTP.get<any>(opcoes);
  }
}
