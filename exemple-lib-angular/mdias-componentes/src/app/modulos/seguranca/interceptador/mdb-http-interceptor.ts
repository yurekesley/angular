import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MDBTimeoutServico } from '../../timeout/timeout.service';

@Injectable()
export class MDBHttpInterceptor implements HttpInterceptor {

constructor(public mdbTimeoutService: MDBTimeoutServico) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;
    let cabecalho: HttpHeaders;

    if (req.headers) {
      cabecalho = req.headers.append('Content-Type', 'application/json; charset=utf-8');
    } else {
      cabecalho = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
    }


    cabecalho = cabecalho.set('X-MDB_TOKEN', 'IGNORADO');
    authReq = req.clone({headers: cabecalho});
    this.mdbTimeoutService.reset();
    return next.handle(authReq);
  }
}



