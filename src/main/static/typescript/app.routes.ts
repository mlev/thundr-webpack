import {HomeController} from "./controller/homeController";
import * as angular from "angular";
import {StateProvider, UrlService} from "angular-ui-router";

class Routes {

    constructor($stateProvider: StateProvider, $urlServiceProvider: UrlService) {

        $urlServiceProvider.rules.otherwise("/");
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
