import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RoutingAppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { AsyncComponent } from '../components/async-stream.component';
import { WithExternalServiceComponent } from '../components/component-mock-external.component';
import { CollapsiblePanelComponent } from '../components/content-projection.component';
import { CounterComponent } from '../components/counter.component';
import { DynamicCssClassesComponent } from '../components/dynamic-css-classes.component';
import { DomTestingComponent } from '../components/domtesting.component';
import { OutputComponent } from '../components/output.component';
import { InputComponent } from '../components/input.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AsyncComponent,
    WithExternalServiceComponent,
    DynamicCssClassesComponent,
    DomTestingComponent,
    OutputComponent,
    CollapsiblePanelComponent,
    InputComponent,
    CounterComponent,
    RoutingAppComponent,
    FilterPipe
  ],
  imports: [
    CommonModule ,
    HomeModule,
    SearchModule,
    AppRoutingModule
  ]
})
export class AppModule {}
