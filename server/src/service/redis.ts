import { RedisClient, createClient, RedisError } from 'redis';
import { promisify } from 'util';
import { Nohm, NohmModel } from 'nohm';
import { UserTokenORMModel } from '../routes/login/UserTokenModel';

let getAsync: any;
let setAsync: any;

class Redis {
    private redisClient: RedisClient;

    constructor() {
        this.redisClient = createClient({
            port : 6379,
            host : process.env.REDIS_HOST,
        });

        this.redisClient.on('connect', () => {
            console.log('redis connected');
            Nohm.setPrefix('archive');
            Nohm.setClient(this.redisClient);
            this.registerModels();
        });

        getAsync = promisify(this.redisClient.get).bind(this.redisClient);
        setAsync = promisify(this.redisClient.set).bind(this.redisClient);

        // set defaults
        this.setProcessQueueFlag(false);

    }

    public setProcessQueueFlag(process: boolean) {
        return setAsync('process-queue-flag', String(process))
        .then()
        .catch((err: RedisError) => {
            console.log('error storing flag in redis', err);
        });
    }

    public getProcessQueueFlag(): Promise<string> {
        return getAsync('process-queue-flag')
        .then((res: string) => {
            console.log('success getting flag from redis', res);
            return res;
        })
        .catch((err: RedisError) => {
            console.log('error getting flag from redis', err);
        });
    }

    public getORM() {
        return Nohm;
    }

    private registerModels() {
        const userTokenStaticModel = Nohm.register(UserTokenORMModel);
    }

}

export default new Redis();

