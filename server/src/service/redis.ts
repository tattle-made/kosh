import { RedisClient, createClient, RedisError } from 'redis';
import { promisify } from 'util';
import { Nohm, NohmModel } from 'nohm';
import { UserTokenORMModel } from '../routes/login/UserTokenModel';
import { AnnotationRedisDataModel } from '../routes/annotation-editor/AnnotationRedisDataModel';

let getAsync: any;
let setAsync: any;

export function setup() {
    const redis = new Redis();
    redis.setup(() => {
        console.log('Redis Connected');
    });
}

export class Redis {
    private redisClient: RedisClient;

    constructor() {
        this.redisClient = createClient({
            port: 6379,
            host: process.env.REDIS_HOST,
        });
    }

    public setup(done: () => void) {
        this.redisClient.on('connect', () => {
            Nohm.setPrefix('archive');
            Nohm.setClient(this.redisClient);
            this.registerModels();
            done();
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
        Nohm.register(UserTokenORMModel);
        Nohm.register(AnnotationRedisDataModel);
    }
}
