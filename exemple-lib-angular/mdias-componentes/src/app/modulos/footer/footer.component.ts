import { FooterService } from './footer.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class MDBFooterComponent implements OnInit {

  @Input()  logoFooter = 'assets/img/logo-footer.png';
  @Input() anoReferencia: string;
  @Input() public versao: string;

  constructor(private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.getVersaoSistema()
    .subscribe(info =>   this.versao = info.version);
  }

}
