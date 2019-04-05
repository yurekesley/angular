import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBAutocompleteComponent } from './autocomplete.component';
import { MatAutocompleteModule, MatInputModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
    , MatInputModule
    , MatAutocompleteModule
    , MatIconModule
    , MatButtonModule
    , MatProgressSpinnerModule
  ]
  , declarations: [MDBAutocompleteComponent]
  , exports: [MDBAutocompleteComponent]
})
export class MDBAutocompleteModule { }
