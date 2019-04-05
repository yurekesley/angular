import { Component, OnInit } from '@angular/core';
import { MDBTimeoutServico } from './timeout.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { UsuarioServico } from '../../util/usuario.service';

@Component({
  selector: 'mdb-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss'],
  animations: [
    trigger(
      'timeoutAnimation', [
        transition(':enter', [
          style({top: '50%', opacity: 0}),
          animate('300ms', style({top: '3%', opacity: 1}))
        ]),
        transition(':leave', [
          style({top: '3%', opacity: 1}),
          animate('200ms', style({top: '-20%', opacity: 0}))
        ])
      ]
    )
  ]
})
export class TimeoutComponent implements OnInit {

  nomeDoUsuario: string;

  constructor(public timeout: MDBTimeoutServico,
              private usuarioService: UsuarioServico) { 
    
    this.usuarioService.buscarUsuario().subscribe(res => {
      this.nomeDoUsuario = res.nome.split(' ')[0];
    });
  }

  ngOnInit() {
  }

  manterSessao() {
    this.timeout.manterSessao();
  }

  deslogar() {
    this.usuarioService.deslogar();
  }
}
