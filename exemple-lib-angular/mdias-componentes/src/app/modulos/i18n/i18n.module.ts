import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBI18NPipe } from './i18n.pipe';
import { MDBI18NService } from './i18n.service';

export function setupTranslateFactory(
  service: MDBI18NService): Function {
  return () => service.use();
}

@NgModule({
  declarations: [
    MDBI18NPipe
  ],
  exports: [
    MDBI18NPipe
  ],
  imports: [
    CommonModule
  ]
})
export class MDBI18NModule { }
