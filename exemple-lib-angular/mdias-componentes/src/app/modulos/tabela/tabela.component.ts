import { Component, OnInit, Input,
         ContentChildren, ViewChild,
         QueryList, Renderer2, Output,
         EventEmitter } from '@angular/core';
import { MDBColunaComponent } from './coluna/coluna.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {Sort} from '@angular/material';
import { UtilServico, buscarValor } from '../../util/util.service';

export class MDBLinhaDaTabela {
  estilo: any;
  item: any;

  constructor(item) {
    this.item = {...item};
  }
}



@Component({
  selector: 'mdb-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class MDBTabelaComponent implements OnInit {

  private listaRenderizada: MatTableDataSource<any> = new MatTableDataSource<any>();
  private _listaCompleta: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _numeroPagina: number;
  private _ehLazy = false;

  @Input() public totalDeItens: number;

  @Input() public ehPaginado = false;

  @Input() public itensPorPagina: number;

  @Input() public set lista(value: any[]) {
    this._listaCompleta = new MatTableDataSource(value ? value : []);
    this.sortData(this.sort);

    if ( this.paginador && !this._ehLazy && this.ehPaginado ) {
      this.paginador.firstPage();
      this.controlarPaginacaoDeListaEstatica(0);
    }

    this.colunas.forEach(coluna => {
      if (coluna.ehCheckbox === true) {
        this.lista.forEach(item => {
          if (item[coluna.atributo] === true) {
            this.selecionados.select(item);
          }
        });
      }
    });

  }
  public get lista() {
    return this.getLista().data;
  }

  @Input() set ehLazy(value: boolean) {
    if (this.ehPaginado) {
        this._ehLazy = value;
    }
  }
  get ehLazy(): boolean {
    return this._ehLazy ;
  }

  @Input() set numeroPagina(value: number) {
    if ( this.ehPaginado ) {
      this._numeroPagina = value;
    }
  }
  get numeroPagina(): number {
    return this._numeroPagina;
  }

  @Output() onLazy: EventEmitter<any> = new EventEmitter<any>();

  @Output() selecionarUm = new EventEmitter<any>();

  @Output() selecionarTodos = new EventEmitter<any>();

  @Output() estiloDaLinha = new EventEmitter<any>();

  @ViewChild('paginador') private paginador: MatPaginator;

  @ContentChildren(MDBColunaComponent, { descendants: true })
  public colunas: QueryList<MDBColunaComponent> = new QueryList<MDBColunaComponent>();

  sort: Sort;

  selecionados = new SelectionModel<Element>(true, []);

  constructor(
    private util: UtilServico,
    private _renderer: Renderer2) { }

  ngOnInit() {
    if ( !this._ehLazy && this.ehPaginado ) {
      this.controlarPaginacaoDeListaEstatica(0);
    }


  }

  sortData(sort: Sort) {
    this.sort = sort;
    if (sort && sort.active) {
      this.getLista().data = this.lista.sort((atual, proximo) => {
        const isAsc = sort.direction === 'asc';
        return compare(atual[sort.active], proximo[sort.active], isAsc);
      });
    }
  }

  public listaCabecalho() {
    const listaCabecalho = [];
    this.colunas.forEach(coluna => {
      listaCabecalho.push(coluna.atributo);
    });
    return listaCabecalho;
  }

  public alterarPagina(event) {
    if (!this._ehLazy) {
      this.controlarPaginacaoDeListaEstatica(event.pageIndex);
    } else {
      this.onLazy.emit(event.pageIndex);
    }
  }

  public mudarValorDoItem(item, atributo) {
    this.selecionarUm.emit();
    this.selecionados.toggle(item);
    item[atributo] = !item[atributo];
  }

  public mudarValorDeTodos(atributo) {
    this.selecionarTodos.emit();
    this.heTodosSelecionado() ? this.desmarcarTodosItens(atributo) : this.marcarTodosItens(atributo);
  }

  private desmarcarTodosItens(atributo) {
    this.selecionados.clear();
    this.lista.forEach(item => {
      item[atributo] = false;
    });
  }

  private marcarTodosItens(atributo) {
    this.lista.forEach(item => {
      item[atributo] = true;
      this.selecionados.select(item);
    });
  }

  public heTodosSelecionado(): boolean {
      const numSelecionados = this.selecionados.selected.length;
      const numLinhas = this.lista.length;
      return numSelecionados === numLinhas;
  }

  private controlarPaginacaoDeListaEstatica(numeroPagina) {
    this.itensPorPagina = this.itensPorPagina ? this.itensPorPagina : 5;
    this.totalDeItens = this._listaCompleta.data.length;
    const inicioPagina = numeroPagina * this.itensPorPagina;

    this.listaRenderizada = new MatTableDataSource(this._listaCompleta.data.slice(inicioPagina, ( inicioPagina + this.itensPorPagina) ));
    this.sortData(this.sort);
  }

  public getLista(): MatTableDataSource<any> {
    if ( this.ehPaginado && !this._ehLazy) {
      return this.listaRenderizada;
    }
    return this._listaCompleta;
  }

  public buscarValor(item: any, atributo: string) {
    return buscarValor(item, atributo);
  }

  public _estiloDaLinha(item) {
    const linha = new MDBLinhaDaTabela(item);
    this.estiloDaLinha.emit(linha);
    return linha;
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

