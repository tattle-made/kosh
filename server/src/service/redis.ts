import { RedisClient, createClient, RedisError } from 'redis';
import { promisify } from 'util';
import { Nohm, NohmModel } from 'nohm';
import { UserTokenORMModel } from '../routes/login/UserTokenModel';
import { singleton } from 'tsyringe';
import { ShareChatAnnotationRedisDataModel } from '../routes/annotation-editor/annotation-templates/sharechat-social-rt/ShareChatAnnotationDataModel';

let getAsync: any;
let setAsync: any;
@singleton()
export class Redis {
    private redisClient: RedisClient;

    constructor() {
        // console.log('redis constructor');
        this.redisClient = createClient({
            port: 6379,
            host: process.env.REDIS_HOST,
        });
    }

    public setup(done: () => void) {
        // console.log('redis setup');
        this.redisClient.on('connect', () => {
            // console.log('redis conneced');
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
        Nohm.register(ShareChatAnnotationRedisDataModel);
    }
}
