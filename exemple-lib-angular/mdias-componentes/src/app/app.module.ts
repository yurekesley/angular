import { PTBR } from './modulos/i18n/lang/pt-br.service';
import { MDBI18NModule } from './modulos/i18n/i18n.module';
import { environment as env } from '../environments/environment';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { OutraPaginaComponent } from './inicio/outra-pagina/outra-pagina.component';
import { MdbModulo } from './util/mdb-modulo';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OutraPaginaComponent
  ],
  imports: [
    AppRoutingModule,
    MDBI18NModule,
    MdbModulo.forRoot(env),
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
