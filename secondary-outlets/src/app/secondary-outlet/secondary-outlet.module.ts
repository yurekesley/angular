import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondaryOutletRoutingModule } from './secondary-outlet-routing.module';
import { ChatComponent } from './chat/chat.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    ChatComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SecondaryOutletRoutingModule
  ]
})
export class SecondaryOutletModule { }
