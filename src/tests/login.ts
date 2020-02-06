import { LoginController } from '../routes/login/LoginController';
const loginController = new LoginController();

const TOKEN = 'saatva';

setTimeout(() => {
    // loginController.addTokenToStore(TOKEN, 160, 'author')
    // .then((result) => console.log(result.message, result.payload))
    // .catch((err) => console.log(err.message));

    loginController.isLoggedIn(TOKEN)
    .then((result) => console.log(result.message, result.payload))
    .catch((err) => console.log(err.message));

    // loginController.deleteToken(TOKEN)
    // .then((res) => console.log(res.message, res.payload))
    // .catch((err) => console.log(err.message, err.payload));
}, 1000);
// loginController.isLoggedIn(TOKEN);


