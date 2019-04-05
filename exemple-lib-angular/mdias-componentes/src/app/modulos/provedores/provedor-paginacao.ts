import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { MDBI18NService } from '../i18n/i18n.service';

@Injectable({providedIn: 'root'})
export class MDBProvedorPaginacao extends MatPaginatorIntl {

  constructor(private i18nService: MDBI18NService) {
    super();
  }

  getRangeLabel = function (page, pageSize, length) {
    this.itemsPerPageLabel = '';
    this.of = this.i18nService.translate('mdbComponentes.paginacao.de');
    this.nextPageLabel =  this.i18nService.translate('mdbComponentes.paginacao.proximaPagina');
    this.previousPageLabel = this.i18nService.translate('mdbComponentes.paginacao.paginaAnterior');
    this.firstPageLabel = this.i18nService.translate('mdbComponentes.paginacao.primeiraPagina');
    this.lastPageLabel = this.i18nService.translate('mdbComponentes.paginacao.ultimaPagina');
    if (length === 0 || pageSize === 0) {
      return '';
    }
    const pagina = this.i18nService.translate('mdbComponentes.paginacao.pagina');
    const totalPagina = Math.ceil(length / pageSize);
    return pagina + ' ' + (page + 1) + ' ' + this.of + ' ' + totalPagina;
  };
}
