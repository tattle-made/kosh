import { Request, Response } from 'express';
import { LoginController } from '../../controllers/LoginController';

const loginController = new LoginController();

export const authenticate = (req: Request, res: Response, next: () => void) => {
    const token = req.headers['token'] as string;
    // console.log('token :', token);
    // tslint:disable-next-line:max-line-length
    if (req.originalUrl === '/api/auth/login' ||
        req.originalUrl.startsWith('/ui') ||
        req.originalUrl.startsWith('/ping') ||
        req.originalUrl.startsWith('/public/ping') ) {
        next();
    } else {
        // const auth = req.headers.authorization;
        if (token) {
            // const token = auth.split(' ')[1];
            loginController
            .existsToken(token)
            .then((data) => {
                if (data.status === true) {
                    const userId = data.userId;
                    res.locals.userId = userId;
                    res.locals.role = data.role;
                    next();
                } else {
                    res.status(401).send('authentication failed');
                }
            })
            .catch((err) => {
                res.status(501).send('Unable to connect');
            });
        } else {
            res.send('No token Provided');
        }
    }
};
