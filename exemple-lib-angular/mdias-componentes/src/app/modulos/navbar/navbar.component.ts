import { UsuarioServico } from './../../util/usuario.service';
import { Usuario } from './../../modelo/usuario';
import { Component, Input, Inject, APP_ID } from '@angular/core';
import { MenuItem } from '../../modelo/menu-item';


@Component({
  selector: 'mdb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class MDBNavbarComponent {

  @Input() logoImg: string;
  @Input() icone: string;
  @Input() mostrarNomeSistema = true;
  @Input() mostrarMenu = true;

  @Input() menu: MenuItem[];
  @Input() usuario: Usuario;

  constructor(private usuarioService: UsuarioServico,
    @Inject(APP_ID) public nomeDoSistema) { }

    public delogar() {
    this.usuarioService.deslogar();
  }
}
