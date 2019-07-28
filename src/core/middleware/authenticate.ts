import { Request, Response } from "express";
import { LoginController } from "../../controllers/LoginController";

const loginController = new LoginController();

export const authenticate = (req: Request, res: Response, next: Function) => {
    const token = req.headers["token"];
    console.log(
        "route and tokenn,,,,,,,,,,,,,,,,fffffffffffffffff#############",
        req.originalUrl,
        token
    );

    console.log("req ", req);
    if (req.originalUrl === "/api/auth/login") {
        console.log("passed ");
        next();
    } else if (token) {
        console.log(
            "authenticaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            token,
            req.body.originalUrl
        );
        loginController
            .existsToken(token)
            .then(data => {
                console.log("data000000000000000000 ", data);
                if (data.status === true) {
                    const userId = data.userId;
                    res.locals.userId = userId;
                    console.log("hai user");
                    next();
                } else {
                    console.log("user nhi hai bhai");
                    res.status(401).json({ message: "authentication failed" });
                }
            })
            .catch(err => {
                console.log("auth middlware ", err);
                res.status(501).json({
                    message:
                        "Unable to connect[ this error when unable to connect to database, to reproduce, try connecting without internet]"
                });
            });
    } else {
        res.json({ message: "No token Provided" });
    }
};
