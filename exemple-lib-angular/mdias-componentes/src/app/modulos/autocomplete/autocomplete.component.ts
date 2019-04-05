import { buscarValor } from '../../util/util.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import {Observable, SubscriptionLike as ISubscription, of as observableOf, timer } from 'rxjs';
import {startWith, map, finalize} from 'rxjs/operators';

import { MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material';
import { MDBI18NService } from '../i18n/i18n.service';

export class LazyEvent {

  public set funcao(funcao: Observable<any>) {
    if (funcao) {
      this.autoComplete.mostrarLoading = true;
      this.autoComplete.requestKeyUp = funcao
      .pipe(
        finalize(() => {this.autoComplete.mostrarLoading = false; }),
      )
      .subscribe(lista => this.autoComplete.lista = lista);
    }
    this.autoComplete.funcaoLazy = funcao;
  }

  constructor(private autoComplete: MDBAutocompleteComponent, public texto: string  ) {}

}

export class Evento {

  constructor(public componente: MDBAutocompleteComponent ) {}

  focusout (event) {
    const componente: MDBAutocompleteComponent = this.componente;
    if (componente.controle.value && typeof componente.controle.value === 'string' && componente.controle.value.trim() === '' ) {
      componente.controle.reset();
    }
    if (typeof componente.controle.value === 'string' && componente.controle.value !== '') {
      componente.controle.setErrors({'naoPossuiValor': true});
    }
    componente.focusout.emit(componente.controle.value);
  }

  itemSelecionado( event: MatAutocompleteSelectedEvent) {
    const componente: MDBAutocompleteComponent = this.componente;
    componente.itemSelecionado.emit(event.option.value);
  }

  focus(event) {
    const componente: MDBAutocompleteComponent = this.componente;
    componente.autoComplete.openPanel();
    componente.focus.emit(event);
  }

  keyup(event) {
    const componente: MDBAutocompleteComponent = this.componente;
    if (componente.lazy.observers.length > 0) {
      if (componente.controle && typeof componente.controle.value === 'string') {
        if (componente.requestKeyUp){
          componente.requestKeyUp.unsubscribe();
        }
        if (componente.keyUpSubscription) {
          componente.keyUpSubscription.unsubscribe();
        }
        if (componente.controle.value.length > 0) {
          componente.keyUpSubscription = timer(500).subscribe(() => {
            const teste: LazyEvent = new LazyEvent(componente, componente.controle.value);
            componente.lazy.emit(teste);
          });

        } else {
          componente.lista = [];
        }
      }
    }
    componente.keyup.emit(event);
  }
}




@Component({
  selector: 'mdb-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class MDBAutocompleteComponent implements OnInit, OnChanges {
  public evento: Evento;

  public requestKeyUp;

  public _controle: AbstractControl = new FormControl();

  public funcaoLazy: Observable<any>;

  public keyUpSubscription: ISubscription;

  @ViewChild( MatAutocompleteTrigger)
  autoComplete: MatAutocompleteTrigger;

  @Input() set controle(valorControle) {
    this._controle = valorControle;
  }
  get controle() {
    return this._controle;
  }

  @Input() public atributoDisplay: string;
  @Input() public label: string;
  @Input() readonly = false;
  @Input() comLoading = true;
  mostrarLoading = false;

  private _lista: Array<any>;
  @Input() set lista(lista) {
    if (lista){
      lista.forEach(element => {
        element.atributoDisplay = this.atributoDisplay;
      });
      this._lista = lista;
      this.carregarOpcoes(lista);
    }
  }
  get lista() {
    return this._lista;
  }

  @Input() public ehObrigatorio = false;
  private _itemInicial: any;

  @Input() public dependentes: Array<AbstractControl>;
  public opcoes: Observable<any[]>;

  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() focusout: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() keyup: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() lazy: EventEmitter<LazyEvent> = new EventEmitter<LazyEvent>();

  constructor(private i18nService: MDBI18NService) {}

  ngOnInit() {
    this.evento = new Evento(this);
    if (this.ehObrigatorio) {
      this._controle.clearValidators();
      this._controle.setValidators([Validators.required]);
    } else {
      this._controle.clearValidators();
    }
  }

  public mostrarError(control: AbstractControl) {
    const obrigatorio = this.i18nService.translate('mdbComponentes.erro.obrigatoriedade');
    const semValor = this.i18nService.translate('mdbComponentes.erro.semValorSelecionado');

    if (control.hasError('required')) {
      return obrigatorio;
    } else {
      if (
          this.controle.value && typeof this.controle.value === 'string'
          &&
          this.controle.value !== '' && control.hasError('naoPossuiValor')) {
        return semValor;
      }
    }
    return null;
  }


  public carregarOpcoes(lista) {
    if (!this.readonly && this._controle) {
      if (this.dependentes && this.dependentes.length > 0) {
        this.dependentes.forEach(dependente => {
            dependente.valueChanges.subscribe( digitado => {
              if (this._controle.touched && this._controle.value) {
                  this._controle.reset();
                  if (this.lazy.observers.length > 0){
                    this.lista = [];
                  }
              }

              if (typeof digitado === 'string') {
                this.opcoes = undefined;
              }
            });
        });
      }
      if (this.lazy.observers.length > 0){
        this.opcoes = observableOf(lista);
      } else {
        this.opcoes = this._controle.valueChanges.pipe( startWith<any>(''),
          map(item => typeof item === 'string' ? item : item ? buscarValor(item, this.atributoDisplay) : '')
          , map( (texto: string) =>
            texto ? this.filtro(lista, texto) : this.filtro(lista,  buscarValor(this._controle.value, this.atributoDisplay) ))
          , map( (lista: any[]) => lista)
        );
      }
    }
  }

  public display(opcao?: any): string | undefined {
    return opcao ? opcao[opcao.atributoDisplay] : undefined;
  }

  public displayWith(opcao): string {
    return opcao ? opcao[opcao.atributoDisplay] : undefined;
  }

  public valorQuandoReadyOnly() {
    if (this.controle && this.controle.value){
      return buscarValor(this.controle.value, this.atributoDisplay);
    }
    return '';
  }

  public filtro<T>(lista, comparacao: string): T[] {
    if (comparacao) {
      return lista.filter(option =>
        buscarValor(option, this.atributoDisplay).toLowerCase().includes(comparacao.toLowerCase()));
    } else {
      return lista.slice();
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['controle'] && changes['controle'].currentValue) {
      this._controle = changes['controle'].currentValue;
      const subscription: ISubscription = this._controle.valueChanges.subscribe(alteracao => {
        if (alteracao && typeof alteracao !== 'string' && !this._itemInicial) {
          this._itemInicial = this._controle.value;
          subscription.unsubscribe();
        }
      });
    }
    if (changes['lista'] && changes['lista'].currentValue) {
      this._lista = changes['lista'].currentValue;
      if (this._itemInicial){
        const itensFiltrados =
        this._lista.filter(option => buscarValor(option, this.atributoDisplay, '')
        .toLowerCase().includes(buscarValor(this._itemInicial, this.atributoDisplay, '').toLowerCase()));
        const item = itensFiltrados.length === 1 ? itensFiltrados[0] : null;
        this._itemInicial = null;
        this._controle.setValue(item);
      }
    }
  }
}

