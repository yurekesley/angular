import { Pipe, PipeTransform } from '@angular/core';
import { MDBI18NService } from './i18n.service';

@Pipe({name: 'i18n'})
export class MDBI18NPipe implements PipeTransform {

  constructor(private translateService: MDBI18NService) { }

  transform(key: any, args: any = {}): any {
    return this.translateService.translate(key, args);
  }
}
