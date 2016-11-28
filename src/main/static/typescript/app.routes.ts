import {HomeController} from "./controller/homeController";
import * as angular from "angular";

class Routes {

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
