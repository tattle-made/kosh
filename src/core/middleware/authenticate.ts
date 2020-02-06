import { Request, Response } from 'express';
import { LoginController } from '../../controllers/LoginController';

const loginController = new LoginController();

export const authenticate = (req: Request, res: Response, next: () => void) => {
    if (req.originalUrl === '/api/auth/login' || req.originalUrl.startsWith('/ui') || req.originalUrl.startsWith('/') ) {
        next();
    } else {
        const auth = req.headers.authorization;
        if (auth) {
            const token = auth.split(' ')[1];
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
