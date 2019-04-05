import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'mdb-modal',
  templateUrl: './modal-padrao.component.html',
  styleUrls: ['./modal-padrao.component.scss'],
  animations: [
    trigger(
      'modalAnimation', [
        transition(':enter', [
          style({top: '100%', opacity: 0}),
          animate('300ms', style({top: '10%', opacity: 1}))
        ]),
        transition(':leave', [
          style({top: '10%', opacity: 1}),
          animate('200ms', style({top: '-20%', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'sombraAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({opacity: 0.5}))
        ]),
        transition(':leave', [
          style({opacity: 0.5}),
          animate('500ms', style({opacity: 0}))
        ])
      ]
    )

  ]
})
export class MDBModalComponent implements OnInit {

  @Input() titulo = '';
  @Input() ativo = false;
  @Input() classe = '';
  @Input() estilo = '';
  
  constructor() { }

  ngOnInit() {
    this.classe = this.classe + ' mdias-modal';
  }

}
