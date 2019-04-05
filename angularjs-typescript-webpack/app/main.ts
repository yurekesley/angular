import './shared/bootstrap'
import {module} from 'angular';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';

export let main = module('app',  []);

main.service('HomeService', HomeService);
main.controller('HomeController', HomeController);

