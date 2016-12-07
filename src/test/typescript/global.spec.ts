import {ModuleUtil} from "./utils/moduleUtil";

/**
 * Global before each logic that will run for every test.
 */
beforeEach(() => {
    ModuleUtil.preventDefaultRouteInterceptor();
});
