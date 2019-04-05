import { II18N } from '../i-i18n';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ENUS implements II18N {

  public getI18n() {

    return {
        'BOTAO' : {
            'NOVO' : 'New',
            'LIMPAR' : 'Clean',
            'PESQUISAR' : 'Search',
            'ADICIONAR' : 'Add',
            'SALVAR' : 'Salvar',
            'EDITAR' : 'Edit',
            'DELETAR' : 'Delete',
            'REMOVER' : 'Remove',
            'CANCELAR' : 'Cancel',
            'VISUALIZAR' : 'View'
        },
        'mdbComponentes' : {
          'erro': {
            'obrigatoriedade' : 'Required field {{a}}',
            'semValorSelecionado' : 'Choose an item from the list'
          },
          'operacao' : {
              'sucesso' : {
                  'salvar' : 'Saved successfully',
                  'editar' : 'Successfully updated',
                  'deletar' : 'Successfully deleted'
              }
          },
          'paginacao': {
              'itensPorPagina': 'Itens per page',
              'proximaPagina': 'Next page',
              'paginaAnterior': 'Previous page',
              'primeiraPagina': 'First page',
              'ultimaPagina': 'Last page',
              'pagina': 'Page',
              'de': 'of'
          }
        }
    };
  }

  public getLinguagem(): string {
  return 'en-US';
  }
}
