import {Queue as QueueType, Job} from 'bull';
import * as Queue from 'bull';
import { CreateStoryRequestModel } from '../routes/fact-checked-stories/CreateStoryRequestModel';
// tslint:disable-next-line:no-var-requires
const { setQueues } = require('@tattle-made/bull-board');
import {Promise} from 'bluebird';
// import { PostCreateRequest } from '../../build/models/request/PostCreateRequest';
import { PostCreateRequest } from '../models/request/PostCreateRequest';
import { PostIndexJobCreateModel } from '../routes/posts/PostIndexJobCreateModel';
import { SearchServer } from '../service/search-server';



class QueueManager {
    private postIndexQueue: QueueType;

    constructor() {
        this.postIndexQueue = new Queue('Whatsapp Post Index Queue', `redis://${process.env.REDIS_HOST}:6379`);


        setQueues([
            this.postIndexQueue,
        ]);

        this.setupWorker();
    }

    public addFactCheckStoryIndexJob(jobParam: CreateStoryRequestModel) {
        return this.postIndexQueue.add(jobParam.getJSONForQueue());
    }

    public addWhatsappPostToIndexJob(jobParam: PostIndexJobCreateModel) {
        return this.postIndexQueue.add(jobParam.getJSONForQueue());
    }

    public setupWorker() {
        this.postIndexQueue.process((job) => {
            const searchServer = new SearchServer();
            return searchServer.indexPostLoose(job.toJSON().data)
                .then()
                .catch((err) => {
                    this.postIndexQueue.pause();
                    // tslint:disable-next-line:max-line-length
                    return Promise.reject(new Error(err.response.status + '\n' + err.response.statusText));
                });
        });

        this.pauseWorker();
    }

    public pauseWorker() {
        return this.postIndexQueue.pause();
    }

    public resumeWorker() {
        return this.postIndexQueue.resume();
    }
}

const queueManagerInstance =  new QueueManager();

export default queueManagerInstance;
