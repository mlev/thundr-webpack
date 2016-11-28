export class HomeController {

    /* @ngInject */
    constructor(private $log: ng.ILogService) {
        $log.debug("homeController updated");
    }

}
