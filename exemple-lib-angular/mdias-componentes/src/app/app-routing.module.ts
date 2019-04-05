import { APP_ROTA_INICIO } from './app.const';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { EquipesResolver } from './resolvers/equipe.resolver';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'outraPagina', component: OutraPaginaComponent },
  { path: '**', redirectTo: APP_ROTA_INICIO, pathMatch: 'full'}
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {useHash: true})]],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
