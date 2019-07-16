import { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
import { Application } from "../../application";

const userController = new UserController();
const application = new Application();

application.addToRouteToControllerMap("/users", userController);
application.addToRouteToControllerMap("/users/create", userController);
application.addToRouteToControllerMap("/posts", userController);
//todo : fix for routes including :id
application.addToRouteToControllerMap("/users/delete/:id", userController);

export const authorize = (req: Request, res: Response, next: Function) => {
    console.log("req ", res.locals.userId);
    // console.log("route ", req.originalUrl);
    // console.log("method ", req.method);
    // console.log(res.locals);
    userController
        .getUserRole(res.locals.userId)
        .then(role => {
            console.log("role ", role);
            console.log(req.originalUrl);
            const value = application.getController(req.originalUrl);
            let permission;
            console.log("value ", value);
            if (value != undefined) {
                if (req.method === "GET") {
                    permission = value.getGetPermissions();
                } else {
                    permission = value.getPostPermissions();
                }
            }
            console.log("permission ", permission);
            // console.log(permission.includes("admin"));
            // console.log("role ", role, typeof role);
            if (permission.includes(role)) {
                next();
            } else {
                return res.status(403).json({ error: "Permission Denied" });
            }
        })
        .catch(err => console.log(err));
};
