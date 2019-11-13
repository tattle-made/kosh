import {Queue as QueueType, Job} from 'bull';
import * as Queue from 'bull';
import { CreateStoryRequestModel } from '../routes/fact-checked-stories/CreateStoryRequestModel';
// tslint:disable-next-line:no-var-requires
const { setQueues } = require('bull-board');
import {Promise} from 'bluebird';
// import { PostCreateRequest } from '../../build/models/request/PostCreateRequest';
import { PostCreateRequest } from '../models/request/PostCreateRequest';
import { PostIndexJobCreateModel } from '../routes/posts/PostIndexJobCreateModel';
import { SearchServer } from '../service/search-server';



class QueueManager {
    private factCheckStoriesIndexQueue: QueueType;
    private whatsappPostIndexQueue: QueueType;

    constructor() {
        this.factCheckStoriesIndexQueue = new Queue('Fact Checked Story Index Queue');
        this.whatsappPostIndexQueue = new Queue('Whatsapp Post Index Queue');

        setQueues([
            this.factCheckStoriesIndexQueue,
            this.whatsappPostIndexQueue,
        ]);

    }

    public addFactCheckStoryIndexJob(jobParam: CreateStoryRequestModel) {
        return this.factCheckStoriesIndexQueue.add(jobParam.getJSONForQueue());
    }

    public addWhatsappPostToIndexJob(jobParam: PostIndexJobCreateModel) {
        return this.whatsappPostIndexQueue.add(jobParam.getJSONForQueue());
    }

    public setupWorker() {
        this.factCheckStoriesIndexQueue.process((job) => {
            return Promise.resolve(job.toJSON())
            .then((result) => console.log(result))
            .then(() => Promise.delay(5000));
        });

        this.processWhatsappQueue();
    }

    private processWhatsappQueue() {
        const searchServer = new SearchServer();
        this.whatsappPostIndexQueue.process((job) => {
            return searchServer.indexPostLoose(job.toJSON().data).then();
        });
    }
}

const queueManagerInstance =  new QueueManager();

export default queueManagerInstance;
