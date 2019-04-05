/// <reference path="../../src/app.ts" />
module Main {
    export class HomeService {
        constructor() {

        }
        public helloWorld() {
           console.log('Method helloWorld from HomeService');
        }
    }
}

app.service('HomeService', Main.HomeService);