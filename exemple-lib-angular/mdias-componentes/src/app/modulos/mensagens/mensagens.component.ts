import { Component, OnInit } from '@angular/core';
import { MDBMensagemServico } from './mensagem.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mdb-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss'],
  animations: [
    trigger(
      'mdias-mensagem', [
        transition(':enter', [
          style({bottom: '-50px', opacity: 0}),
          animate('300ms', style({bottom: '0', opacity: 1}))
        ]),
        transition(':leave', [
          style({bottom: '0', opacity: 1}),
          animate('300ms', style({bottom: '30px', opacity: 0}))
        ])
      ]
    )
  ]
})
export class MDBMensagensComponent implements OnInit {
  constructor(public mensagensService: MDBMensagemServico) {
  }

  ngOnInit() {
  }

  fechar() {
    this.mensagensService.limparMensagem();
  }

  public removerMensagem(index: number): void {
    this.mensagensService.removerMensagem(index);
  }
}
