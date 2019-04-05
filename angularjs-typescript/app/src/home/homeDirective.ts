/// <reference path="../../src/app.d.ts" />
module Main {
    export class HomeDirective implements ng.IDirective  {
        restrict = 'A';

        constructor (private $location: ng.ILocationService) {
            console.log('HomeDirective Working');
        }
        
        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, 
            ctrl: any) => {
                
            }
           
        static factory(): ng.IDirectiveFactory {
            const directive = ($location: ng.ILocationService) => new HomeDirective($location);
            directive.$inject = ['$location'];
            return directive;
        }
    
    }
}
app.directive('home', Main.HomeDirective.factory());
