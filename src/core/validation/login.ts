import { Json } from "sequelize/types/lib/utils";

const validator = require("validator");
const isEmpty = require("is-empty");

interface Body {
    username: string;
    password: any;
}
export const loginValidator = (data: Body) => {
    let errors = {} as Body;

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
