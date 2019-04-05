import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { buscarValor } from '../../util/util.service';
import { II18N } from './i-i18n';
import { I18N } from '../../provedores/bootstrap.provider';
import { PTBR } from './lang/pt-br.service';
import { ENUS } from './lang/en-us.service';

@Injectable({providedIn: 'root'})
export class MDBI18NService {

  private _data: any = {};

  get service(): II18N {
     const _service =  this.getProvedorDeLinguagem(this.i18n);
    return  this.injector.get<II18N>(_service);
  }
  private getProvedorDeLinguagem(i18n: string): any {
    if (i18n === 'pt-BR') {
      return PTBR;
    }
    if (i18n === 'en-US') {
      return ENUS;
    }
    throw new Error('Parâmetro I18N: ' + i18n + ' de linguagem. Não disponível no mdias-componentes');
  }

  constructor(private http: HttpClient
    , @Inject(I18N) private i18n: string
    , private injector: Injector) { }

  use(): Promise<{}> {

    try {

      return new Promise<{}>((resolve) => {
        this.http.get<{}>(`assets/i18n/${this.service.getLinguagem()}.json`).subscribe(appI18n => {
            this._data = Object.assign(this.service.getI18n(), appI18n || {});
            resolve(this._data);
          },
          error => {
            this._data = Object.assign(this.service.getI18n(), {});
            resolve(this._data);
            throw new Error(`Propriedade I18N em Environment não contem um valor válido. Deveria ser um valor da classe I18NEnum`  );
          }
        );
      });
    } catch (error) {
      throw new Error(`Não foi possível recuperar uma instância da interface II18N, verifique o valor de env.I18N: ${I18N}`  );
    }
  }

  translate(key: any, parametros: any = {}) {
    let texto: string =  buscarValor(this._data,  key, '');

    if ( typeof texto !== 'string' ) {
       return texto;
    }

    const esquecido = new RegExp('{{.}}', 'g');
    for (const key in parametros) {
      if (parametros.hasOwnProperty(key)) {
        const valor = parametros[key];
        const replace = new RegExp('{{' + key + '}}', 'g');
        texto = texto.replace(replace , valor);
      }
    }
    texto = texto.replace(esquecido , '');
    return texto;
  }
}
