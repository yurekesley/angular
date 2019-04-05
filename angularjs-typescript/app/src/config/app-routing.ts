/// <reference path="../../src/app.d.ts" />

namespace Main {
  export class AppRouting {
    constructor(private $routeProvider) {
      this.config();
    }
    private config() {
      this.$routeProvider.when("/", {
        templateUrl: "./app/home/principal.html"
      });
      this.$routeProvider.otherwise({ redirectTo: "/" });
    }
  }
  app.config(["$routeProvider", $routeProvider => {
      return new Main.AppRouting($routeProvider);
    }
  ]);
}
