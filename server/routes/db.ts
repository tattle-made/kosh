import { Sequelize } from 'sequelize';

// DB Connection Credentials

const SQL_DB_HOST = 'localhost';
const SQL_DB_PASSWORD = '';
const SQL_DB_USERNAME = '';
const SQL_DB_NAME = '';

class DB {
    private sequelize: Sequelize;
    constructor() {
        this.sequelize = new Sequelize(
                SQL_DB_NAME as string,
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
