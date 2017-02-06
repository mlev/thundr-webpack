/// <reference path="../../../../typings/index.d.ts" />

import * as angular from "angular";
import "angular-ui-bootstrap";
import "angular-ui-router";

angular
    .module("app", [
        "ui.bootstrap",
        "ui.router",
    ]);

import "../less/styles/home.less";
import "../less/styles/main.less";
import "./app.config";
import "./app.routes";
