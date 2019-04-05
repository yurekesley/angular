import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'sidebar', component: SidebarComponent, outlet: 'secundary'},
  {path: 'chat', component: ChatComponent, outlet: 'secundary'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondaryOutletRoutingModule { }
