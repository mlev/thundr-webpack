namespace App {
    "use strict";

    class Routes {

        public static $inject = ["$stateProvider", "$urlRouterProvider"];

        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("home", {
                    controller: HomeController,
                    controllerAs: "ctrl",
                    templateUrl: "/static/templates/home.html",
                    url: "/"
                })

            ;

        }
    }

    angular
        .module("app")
        .config(Routes);
}
