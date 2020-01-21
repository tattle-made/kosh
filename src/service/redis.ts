import { RedisClient, createClient, RedisError } from 'redis';
import { promisify } from 'util';

let getAsync: any;
let setAsync: any;

class Redis {
    private redisClient: RedisClient;

    constructor() {
        this.redisClient = createClient({
            port : 6379,
            host : process.env.REDIS_HOST,
        });

        getAsync = promisify(this.redisClient.get).bind(this.redisClient);
        setAsync = promisify(this.redisClient.set).bind(this.redisClient);

        // set defaults
        this.setProcessQueueFlag(false);
    }

    public setProcessQueueFlag(process: boolean) {
        return setAsync('process-queue-flag', String(process))
        .then((res: string) => {
            console.log('success storing flag in redis', res);
        })
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
}

export default new Redis();

