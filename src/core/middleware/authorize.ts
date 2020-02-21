import { Request, Response } from 'express';
import { UserController } from '../../controllers/UserController';
import { Application } from '../../application';

const userController = new UserController();
const application = new Application();

export const authorize = (req: Request, res: Response, next: () => void) => {
    // tslint:disable-next-line:max-line-length
    if (req.originalUrl === '/api/auth/login' ||
        req.originalUrl.startsWith('/ui') ||
        req.originalUrl.startsWith('/ping') ||
        req.originalUrl.startsWith('/public/ping')
        ) {
        return next();
    }

    application.addToRouteToControllerMap(req.originalUrl, userController);
    userController
        .getUserRole(res.locals.userId)
        .then((role) => {
            const value = application.getController(req.originalUrl);
            let permission;
            if (value !== undefined) {
                permission = value.getPermissions(req.originalUrl, req.method);
            }

            if (permission.includes(role)) {
                next();
            } else {
                return res.status(403).send('Permission Denied');
            }
        })
        .catch((err) => console.log(err));
};
