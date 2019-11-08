import {Queue as QueueType, Job} from 'bull';
import * as Queue from 'bull';
import { CreateStoryRequestModel } from '../routes/fact-checked-stories/CreateStoryRequestModel';
// tslint:disable-next-line:no-var-requires
const { setQueues } = require('bull-board');
import {Promise} from 'bluebird';


class QueueManager {
    private factCheckStoriesIndexQueue: QueueType;

    constructor() {
        this.factCheckStoriesIndexQueue = new Queue('test');

        setQueues([
            this.factCheckStoriesIndexQueue,
        ]);
    }

    public addFactCheckStoryIndexJob(jobParam: CreateStoryRequestModel) {
        return this.factCheckStoriesIndexQueue.add(jobParam.getJSONForQueue());
    }

    public setupWorker() {
        this.factCheckStoriesIndexQueue.process((job) => {
            return Promise.resolve(job.toJSON())
            .then((result) => console.log(result))
            .then(() => Promise.delay(5000));
        });
    }
}

const queueManagerInstance =  new QueueManager();

export default queueManagerInstance;
