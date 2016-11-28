import * as angular from "angular";

class IeCacheFix {

    constructor($httpProvider: ng.IHttpProvider) {

        // Initialize http get header defaults if required
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get["If-Modified-Since"] = 0;

    }
}

class TemplateCacheBuster {

    constructor($provide: ng.auto.IProvideService) {

        const cacheBuster = Date.now().toString();

        function templateFactoryDecorator($delegate) {
            let fromUrl = angular.bind($delegate, $delegate.fromUrl);
            $delegate.fromUrl = (url, params) => {
                if (url !== null && angular.isDefined(url) && angular.isString(url)) {
                    url += (url.indexOf("?") === -1 ? "?" : "&");
                    url += "v=" + cacheBuster;
                }

                return fromUrl(url, params);
            };

            return $delegate;
        }

        $provide.decorator("$templateFactory", ["$delegate", templateFactoryDecorator]);

    }
}

angular
    .module("app")
    .config(IeCacheFix)
    .config(TemplateCacheBuster);
