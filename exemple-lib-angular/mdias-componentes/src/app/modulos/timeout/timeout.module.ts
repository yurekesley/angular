import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeoutComponent } from './timeout.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [TimeoutComponent],
  exports: [TimeoutComponent]
})
export class MDBTimeoutModule { }
