namespace Main {
   export class MenuDirective implements ng.IDirective {
        restrict = 'E';
        templateUrl = './app/commom/menu/menu.html';
        constructor(){
        }

        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, 
            ctrl: any) => {
            jQuery('.ui.dropdown').dropdown();     
        }

        static factory(): ng.IDirectiveFactory {
            const directive = () => new MenuDirective();
            directive.$inject = [];
            return directive;
        }
    }
}
app.directive('menu', Main.MenuDirective.factory());