import { II18N } from '../i-i18n';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PTBR implements II18N {

 public getI18n() {

    return {
        'mdbComponentes' : {
          'erro': {
            'obrigatoriedade' : 'Campo obrigatório',
            'semValorSelecionado' : 'Escolha um item da lista'
          },
          'operacao' : {
              'sucesso' : {
                  'salvar' : 'Salvo com sucesso',
                  'editar' : 'Atualizado com sucesso',
                  'deletar' : 'Deletado com sucesso'
              }
          },
          'paginacao': {
              'itensPorPagina': 'Itens por página',
              'proximaPagina': 'Proxima página',
              'paginaAnterior': 'Página anterior',
              'primeiraPagina': 'Primeira página',
              'ultimaPagina': 'Ultima página',
              'pagina': 'Página',
              'de': 'de'
          }
        }
    };
  }

  public getLinguagem(): string {
    return 'pt-BR';
  }
}
