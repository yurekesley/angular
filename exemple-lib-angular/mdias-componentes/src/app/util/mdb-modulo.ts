import { I18N } from './../provedores/bootstrap.provider';
import { MDBI18NModule } from './../modulos/i18n/i18n.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_ID, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, APP_INITIALIZER, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule, MatIconModule, MatButtonModule,
         MatCardModule, MatFormFieldModule, MatInputModule,
         MatSelectModule, MatTableModule, MatPaginatorModule,
         MatSortModule, MatDialogModule, MatDatepickerModule,
         MatMenuModule, MatTabsModule, MatAutocompleteModule,
         MatCheckboxModule, MatNativeDateModule,
         MatTooltipModule,
         MatPaginatorIntl,
         MAT_DATE_LOCALE } from '@angular/material';

import { MDBGridModule } from '../modulos/grid/grid.module';
import { MDBFooterModule } from '../modulos/footer/footer.module';
import { MDBTarjetaModule } from '../modulos/tarjeta/tarjeta.module';
import { MDBTabelaModule } from '../modulos/tabela/tabela.module';
import { MDBContainerModule } from '../modulos/container/container.module';
import { MDBMensagensModule } from '../modulos/mensagens/mensagens.module';
import { MDBHttpInterceptor } from '../modulos/seguranca/interceptador/mdb-http-interceptor';
import { MDBWizardModule } from '../modulos/wizard/wizard.module';
import { MDBProvedorPaginacao } from '../modulos/provedores/provedor-paginacao';
import { MDBAutenticaoModule } from '../modulos/seguranca/autenticacao/mdb-autenticacao.module';
import { MDBTimeoutModule } from '../modulos/timeout/timeout.module';
import { MDBModalModule } from '../modulos/modal/modal.module';
import { ROTA_INICIO, URL_SERVIDOR} from '../provedores/bootstrap.provider';
import { MDBAutocompleteModule } from '../modulos/autocomplete/autocomplete.module';
import { MDBAppModule } from '../modulos/app/app.module';
import { MDBErrorHandler } from '../provedores/mdb-error.handler';
import { MDBI18NService } from '../modulos/i18n/i18n.service';
import { setupTranslateFactory } from '../modulos/i18n/i18n.module';
import { IEnvironment } from '../provedores/i-environment';

const modulos = [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatNativeDateModule,

    MDBModalModule,
    MDBContainerModule,
    MDBGridModule,
    MDBFooterModule,
    MDBMensagensModule,
    MDBTarjetaModule,
    MDBAutocompleteModule,
    MDBTabelaModule,
    MDBAppModule,
    MDBAutenticaoModule,
    MDBWizardModule,
    MDBTimeoutModule,
    MDBI18NModule
];

@NgModule({
  exports: [ modulos ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MdbModulo {



  static forRoot(env: IEnvironment): ModuleWithProviders {
    return {
      ngModule: MdbModulo,
        providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MDBHttpInterceptor,
          multi: true
        },
        {
          provide: ErrorHandler,
          useClass: MDBErrorHandler
        },
        {
          provide: MAT_DATE_LOCALE,
          useValue: 'pt-BR'
        },
        {
          provide: MatPaginatorIntl,
          useClass: MDBProvedorPaginacao
        },
        {
          provide: APP_INITIALIZER,
          useFactory: setupTranslateFactory,
          deps: [ MDBI18NService ],
          multi: true
        },
        { provide: APP_ID, useValue: env.APP_ID },
        { provide: ROTA_INICIO, useValue: env.ROTA_INICIO},
        { provide: URL_SERVIDOR, useValue: env.URL_SERVIDOR },
        { provide: I18N, useValue: env.I18N }
      ]
    };
  }
}
