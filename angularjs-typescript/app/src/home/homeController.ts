/// <reference path="../../src/app.d.ts" />

namespace Main {
  export class HomeController implements ng.IOnInit {
    constructor(private homeService: HomeService) {
      this.homeService.helloWorld();
    }
    
    public $onInit() {
      jQuery(".dropdown").dropdown({
        maxSelections: 3
      });
    }
  }
}

app.controller("HomeController", ["HomeService", Main.HomeController]);
