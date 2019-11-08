import { Request, Response } from 'express';
import { LoginController } from '../../controllers/LoginController';

const loginController = new LoginController();

export const authenticate = (req: Request, res: Response, next: () => void) => {
    const token = req.headers['token'] as string;
    if (req.originalUrl === '/api/auth/login' || req.originalUrl.startsWith('/ui') ) {
        next();
    } else if (token) {
        loginController
            .existsToken(token)
            .then((data) => {
                if (data.status === true) {
                    const userId = data.userId;
                    res.locals.userId = userId;
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
};
