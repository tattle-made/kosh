import { LoginController } from '../routes/login/LoginController';
import { LoginController as OldLoginController} from '../controllers/LoginController';
const loginController = new LoginController();
const oldLoginController = new OldLoginController();

const TOKEN = '12454b00-48ab-11ea-ab77-01789fb90b34';

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


