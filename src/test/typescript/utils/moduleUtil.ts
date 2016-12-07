import * as angular from "angular";

export class ModuleUtil {

    public static preventDefaultRouteInterceptor() {
        angular.mock.module("ui.router", ($urlRouterProvider: angular.ui.IUrlRouterProvider) => {
            $urlRouterProvider.deferIntercept();
        });
    }
}
