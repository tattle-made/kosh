import BaseController from "./controllers/_BaseController";

export class Application {
    private routeToController = new Map<string, BaseController>();

    public addToRouteToControllerMap(
        route: string,
        controller: BaseController
    ) {
        this.routeToController.set(route, controller);
    }

    public getController(route: any) {
        return this.routeToController.get(route);
    }

    constructor() {
        //this.routeToController.set('/login', new LoginController());
    }
}
