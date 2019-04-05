import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatProgressSpinnerModule } from '@angular/material';
import { MDBAppComponent } from './app.component';

import { MDBMensagensModule } from '../mensagens/mensagens.module';
import { MDBNavbarModule } from '../navbar/navbar.module';
import { MDBFooterModule } from '../footer/footer.module';
import { MDBTimeoutModule } from '../timeout/timeout.module';
import { MDBI18NModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MDBMensagensModule,
    MDBNavbarModule,
    MDBFooterModule,
    MDBTimeoutModule,
    MDBI18NModule,
  ],
  declarations: [MDBAppComponent],
  exports: [MDBAppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MDBAppModule { }
