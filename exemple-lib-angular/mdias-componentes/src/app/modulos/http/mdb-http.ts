import { HttpHeaders, HttpParams } from '@angular/common/http';
import { MdbMensagemHttp } from './mdb-mensagem-http';

export class MDBHttp {
    public comLoading = true;
    public headers: HttpHeaders = new HttpHeaders();
    public params: HttpParams;
    public reportProgress: boolean;
    public withCredentials: boolean;
    public responseType: any = 'json';
    public observe?: any = 'body';

    constructor (
      public rest: string,
      private parametros: Partial<MDBHttp> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
      this.rest = rest;
    }

    public get options(): {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } {
        return  {
            headers: this.headers,
            observe: this.observe,
            params: this.params,
            reportProgress: this.reportProgress,
            responseType: this.responseType,
            withCredentials: this.withCredentials
        };
    }

    public addHeader(nome: string , value: string | string[]) {
        if (value) {
            this.headers = this.headers ? this.headers : new HttpHeaders();
            this.headers = this.headers.append(nome, value);
        }
    }
}
