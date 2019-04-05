import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBWizardComponent } from './wizard.component';
import { MDBGridModule } from '../grid/grid.module';
import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { MDBWizardItemComponent } from './wizard-item/wizard-item.component';
import { MDBWizardAcoesComponent } from './wizard-acoes/wizard-acoes.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MDBGridModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [MDBWizardComponent, MDBWizardItemComponent, MDBWizardAcoesComponent],
  exports: [MDBWizardComponent, MDBWizardItemComponent, MDBWizardAcoesComponent]
})
export class MDBWizardModule { }
