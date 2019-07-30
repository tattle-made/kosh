import { Request, Response } from "express";
import { LoginController } from "../../controllers/LoginController";

const loginController = new LoginController();

export const authenticate = (req: Request, res: Response, next: Function) => {
    const token = req.headers["token"];
    if (req.originalUrl === "/api/auth/login") {
        next();
    } else if (token) {
        loginController
            .existsToken(token)
            .then(data => {
                if (data.status === true) {
                    const userId = data.userId;
                    res.locals.userId = userId;

                    next();
                } else {
                    res.status(401).json({ message: "authentication failed" });
                }
            })
            .catch(err => {
                res.status(501).json({
                    message: "Unable to connect"
                });
            });
    } else {
        res.json({ message: "No token Provided" });
    }
};
