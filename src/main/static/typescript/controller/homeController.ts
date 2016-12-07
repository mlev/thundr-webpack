export class HomeController {

    public intro: string;

    /* @ngInject */
    constructor(private $log: ng.ILogService) {
        $log.debug("homeController");
        this.intro = "This content comes from the controller";
    }

}
