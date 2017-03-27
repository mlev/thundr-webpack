import * as angular from "angular";
import {UrlService} from "angular-ui-router";

export class ModuleUtil {

    public static preventDefaultRouteInterceptor() {
        angular.mock.module("ui.router", ($urlServiceProvider: UrlService) => {
            $urlServiceProvider.deferIntercept();
        });
    }
}
