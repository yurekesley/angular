import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'mdb-wizard-acoes',
  templateUrl: './wizard-acoes.component.html',
  styleUrls: ['./wizard-acoes.component.scss']
})
export class MDBWizardAcoesComponent implements OnInit {

  @Input() ehDesabilitadoProximo = false;
  @Input() ehDesabilitadoAnterior = false;
  
  @Input() valorProximo = 'PRÓXIMO';
  @Input() valorAnterior = 'ANTERIOR';
  
  @Output() onProximo = new EventEmitter<any>();
  @Output() onAnterior = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  acaoDoProximo() {
    this.onProximo.emit();
  }

  acaoDoAnterior() {
    this.onAnterior.emit();
  }

}
