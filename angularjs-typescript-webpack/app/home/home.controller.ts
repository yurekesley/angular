import { IController } from 'angular';
import { HomeService } from './home.service';

export class HomeController implements IController {
    
    static $inject = ['HomeService'];

    constructor(private homeService: HomeService) {}

    public teste() {
       this.homeService.testFromService();
    }
  }

