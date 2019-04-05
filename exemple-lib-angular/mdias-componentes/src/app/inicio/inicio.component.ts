import { MDBI18NService } from './../modulos/i18n/i18n.service';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MDBLinhaDaTabela } from '../modulos/tabela/tabela.component';
import { timeout } from '../util/decorators';

@Component({
  selector: 'mdias-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public lista: any[];
  public form: FormGroup;
  public meses: any[];

   STATUS_PDCA_LISTA = [
    { chave: 'EM_CADASTRO', valor: 'EM CADASTRO'},
    { chave: 'AGUARDANDO_APROVACAO', valor: 'AGUARDANDO APROVAÇÃO'},
    { chave: 'REPROVADO', valor: 'REPROVADO'},
    { chave: 'EM_EXECUCAO', valor: 'EM EXECUÇÃO'},
    { chave: 'AGUARDANDO_PARECER', valor: 'AGUARDANDO PARECER'},
    { chave: 'AGUARDANDO_CONCLUSAO', valor: 'AGUARDANDO CONCLUSÃO'},
    { chave: 'CONCLUIDO', valor: 'CONCLUÍDO'}
  ];

  get traducao() {
    return this.i18nService.translate('COR');
  }

  constructor(private formBuilder: FormBuilder, private i18nService: MDBI18NService) {}


  ngOnInit() {
    this.criarFormulario();
    this.lista = [
      {id: 1, nome: 'Teste', desc: 'blibli'},
      {id: 2, nome: 'Teste', desc: 'blibli'},
      {id: 3, nome: 'Teste', desc: 'blibli'},
      {id: 4, nome: 'Teste', desc: 'blibli'}
    ];

    console.log(this.i18nService.translate('COR'));
  }

  confirmar() {
  }

  getEquipes() {
  }

  limpar() {}

  pintarLinha(linha: MDBLinhaDaTabela) {
    linha.item.nome = 'BLIBLIBLI';
    if (linha.item.id === 2) {

      linha.estilo = {'background' : 'red'};
    }
  }



  public traduzir() {
    this.i18nService.use();
    this.logar();

  }


  @timeout(500)
  logar () {
    console.log(this.i18nService.translate('COR'));

  }

  public mostrarError(controll: AbstractControl): string {
    return error(controll);
  }

  public criarFormulario() {
    this.form = this.formBuilder.group({
      equipe: [null],
      indicador: [null],
      ano:
      [
          null,
            [
              Validators.pattern('^[0-9]+$')
            ]
      ],
      mes: [null],
      status: [null]
    });
  }


}



export function error(control: AbstractControl): string {
  if (control.hasError('required')) {
    return 'Campo obrigatório.';
  }
  if (control.hasError('pattern')) {
    return 'Informe um valor válido';
  }
}
