import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdb-wizard-item',
  templateUrl: './wizard-item.component.html',
  styleUrls: ['./wizard-item.component.scss']
})
export class MDBWizardItemComponent implements OnInit {


  @Input() titulo: string;
  @Input() tooltip: string;
  @Input() imagem: any;
  @Input() ativo = false;
  @Input() valido = false;

  constructor() { }

  ngOnInit() {
  }

}
