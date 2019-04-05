import { Component, OnInit, ContentChildren,
        QueryList, AfterContentInit, Input,
        OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { MDBWizardItemComponent } from './wizard-item/wizard-item.component';


@Component({
  selector: 'mdb-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class MDBWizardComponent implements OnInit, AfterContentInit, OnChanges {

  @ContentChildren(MDBWizardItemComponent) itens: QueryList<MDBWizardItemComponent>;

  @Input() itemAtivo = 1;

  @Output() clique: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.atualizarPasso(this.itemAtivo);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.itens) {
      this.atualizarPasso(changes.itemAtivo.currentValue);
    }
  }

  clicarItem(itemClicado) {
    this.clique.emit(itemClicado);
  }

  private atualizarPasso(index) {
    for (let i = 0; i < index ; i++) {
      if (i < (index - 1)) {
        this.itens.toArray()[i].ativo = false;
        this.itens.toArray()[i].valido = true;
      } else {
        this.itens.toArray()[i].ativo = true;
        this.itens.toArray()[i].valido = false;
      }
    }
    for (let i = index ; i < this.itens.length ; i++) {
      this.itens.toArray()[i].ativo = false;
      this.itens.toArray()[i].valido = false;
    }
  }
}
