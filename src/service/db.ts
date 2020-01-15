import * as config from 'config';
import { Sequelize } from 'sequelize';

const {
    SQL_DB_HOST,
    SQL_DB_PASSWORD,
    SQL_DB_PORT,
    SQL_DB_USERNAME,
    SQL_TABLE_NAME,
} = process.env;

class DB {
    private sequelize: Sequelize;
    constructor() {
        // const { host, port, username, password, table } = config.get('db');
        this.sequelize = new Sequelize(
                SQL_TABLE_NAME as string,
                SQL_DB_USERNAME as string,
                SQL_DB_PASSWORD as string,
                {
                    host: SQL_DB_HOST,
                    dialect: 'mysql',
                    logging: false,
                },
            );
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
