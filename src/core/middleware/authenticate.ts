import { Request, Response } from "express";
import { LoginController } from "../../controllers/LoginController";

const loginController = new LoginController();

export const authenticate = (req: Request, res: Response, next: Function) => {
    const token = req.headers["token"];
    // console.log("req ", req);
    // console.log("token ", token);
    if (token) {
        loginController
            .existsToken(token)
            .then(data => {
                if (data.status === true) {
                    const userId = data.userId;
                    res.locals.userId = userId;
                    next();
                } else {
                    res.status(401).json({ error: "authentication failed" });
                }
            })
            .catch(err => console.log(err));
    } else {
        res.json({ error: "No token Provided" });
    }
};
