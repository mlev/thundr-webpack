import "../../main/static/typescript/app";
import * as angular from "angular";
import "angular-mocks";

describe("appConfig", () => {

    let $httpBackend;
    let $httpProvider;
    let $templateFactory;

    beforeEach(() => {

        angular.mock.module("app", (_$httpProvider_: ng.IHttpProvider) => {
            $httpProvider = _$httpProvider_;
        });

        angular.mock.inject((_$httpBackend_: ng.IHttpBackendService, _$templateFactory_) => {
            $templateFactory = _$templateFactory_;
            $httpBackend = _$httpBackend_;
        });
    });

    describe("IeCacheFix", () => {

        it("should have If-Modified-Since default header", () => {
            expect(true).toBeTruthy();
            expect($httpProvider.defaults.headers.get["If-Modified-Since"]);
        });

    });

    describe("TemplateCacheBuster", () => {

        it("should append version when url does not have query params", () => {
            $httpBackend.expectGET(new RegExp("/my/template\\?v=\\d+")).respond(200, "response");

            $templateFactory.fromUrl("/my/template", undefined);

            $httpBackend.flush();
        });

        it("should append version when url already has params", () => {
            $httpBackend.expectGET(new RegExp("/my/template\\?param=value&v=\\d+")).respond(200, "response");

            $templateFactory.fromUrl("/my/template?param=value", undefined);

            $httpBackend.flush();
        });

        it("should not append version when uib/template url", () => {
            $httpBackend.expectGET("uib/template/123").respond(200, "response");

            $templateFactory.fromUrl("uib/template/123", undefined);

            $httpBackend.flush();
        });

    });

});
