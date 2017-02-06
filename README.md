# thundr-webpack
Example Thundr Project built with Webpack

This is an example of using webpack instead of grunt/bower to build the js artefacts for a thundr application.

## Demo

This project is deployed here http://thundr-webpack.appspot.com/

## No more grunt

A big difference is that it gets rid of grunt and bower so we just have npm and webpack.

So now npm can be used as the task runner:

e.g. 
```
grunt default -> npm run dev
grunt clean ->  npm run clean
grunt build -> npm run build
grunt test -> npm run test
```

## No more bower dependencies

All dependencies are managed through npm and we no longer need to inject the libraries into our html as this is all done via the bundle file.

With Webpack all dependencies are driven through our application entry point (i.e. app.ts). Everything that ends up in our application bundle, including our styles, is imported from here.

e.g.
```
import * as angular from "angular";
import "angular-ui-bootstrap";
import "angular-ui-router";

angular.module("app", [
    "ui.bootstrap",
    "ui.router"
]);
import "../less/styles/home.less";
import "../less/styles/main.less";
```

## Karma

The karma-webpack plugin generates its own bundle for testing via webpack. This means you can simply run karma from the karma.conf.js file - i.e. you can use your IDEs Karma integration.

## Deployment

Deployment is still using Maven. e.g.
```
mvn appengine:update -Pdev
```
