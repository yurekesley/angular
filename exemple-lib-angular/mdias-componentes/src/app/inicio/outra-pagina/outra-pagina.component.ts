import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MDBMensagemServico } from '../../modulos/mensagens/mensagem.service';
import { Router } from '@angular/router';
import { MdbAcsServico } from '../../modulos/acs/acs.service';

@Component({
  selector: 'mdias-outra-pagina',
  templateUrl: './outra-pagina.component.html',
  styleUrls: ['./outra-pagina.component.scss']
})
export class OutraPaginaComponent implements OnInit, OnChanges{

  public itemAtivo = 1;
  public equipes: Array<any> = new Array<any>();

  public formReuniao: FormGroup;

  @Input() public item: any;

  constructor(formBuilder: FormBuilder
  , private mensageria: MDBMensagemServico
  , private acsServico: MdbAcsServico
  , private rota: Router) {
      this.formReuniao = formBuilder.group({
        equipe: [null, Validators.required],
      });
    }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue ) {
        this.item = changes['item'].currentValue;
        this.formReuniao.patchValue({equipe: this.item});
    }
  }
}
