import { SecondaryOutletModule } from './secondary-outlet/secondary-outlet.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryOutletModule } from './primary-outlet/primary-outlet.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimaryOutletModule,
    SecondaryOutletModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
