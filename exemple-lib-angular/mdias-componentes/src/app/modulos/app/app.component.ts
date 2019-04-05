import { MDBLoadService } from '../../util/mdb-load.service';
import { ROTA_INICIO } from './../../provedores/bootstrap.provider';
import { Component, Input, Inject, OnInit, APP_ID } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioServico } from '../../util/usuario.service';
import { MenuItem } from '../../modelo/menu-item';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'mdb-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class MDBAppComponent implements OnInit{

  @Input() logoImg: string;
  @Input() logoIcone: string;
  @Input() anoReferencia: string;
  @Input() mostrarNomeSistema = true;

  public usuario: Usuario;
  public menu: MenuItem[];

  public usuarioObservable = this.usuarioService.buscarUsuario();
  public menuObsavable = this.usuarioService.buscarMenu();

  constructor(
            private usuarioService: UsuarioServico,
            @Inject (APP_ID) public nomeAplicao: string,
            @Inject (ROTA_INICIO) public rotaInicio: string,
            private loadService: MDBLoadService) {}

  ngOnInit() {
   forkJoin(this.usuarioObservable, this.menuObsavable)
    .subscribe((res: Array<any>) =>  {
      this.usuario = res[0];
      this.menu = res[1];
    });
  }

  public loadding(): boolean {
    return this.loadService.mostrar;
  }
}
