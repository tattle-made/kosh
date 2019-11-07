import * as config from 'config';
import { Sequelize } from 'sequelize';

class DB {
    private sequelize: Sequelize;
    constructor() {
        const { host, port, username, password, table } = config.get('db');
        this.sequelize = new Sequelize(table, username, password, {
            host,
            dialect: 'mysql',
            logging: false,
        });
    }

    public test() {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('connection yes');
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    public get(): Sequelize {
        return this.sequelize;
    }
}

export default new DB();
