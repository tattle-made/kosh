export default class {
    private route: string;
    constructor(route: string) {
        this.route = route;
    }

    public getPermissions(route: string, method: string): any {}
}
