import { Express, Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import Redis from '../../service/redis';
import queueManagerInstance from '../../../src/queue';

const isStringValidBoolean = (status: string) => {
    if (status === 'true' || status === 'false') {
        return true;
    } else {
        return false;
    }
};

export const getBooleanFromString = (status: string) => {
    return status === 'true' ? true : false;
};


/**
 * todo : send success response, send failure response
 * @param app
 */
export function register(app: Express) {
    app.post('/api/process-queue/enable', (req: Request, res: Response) => {
        const { enable } = req.body;
        Redis.setProcessQueueFlag(enable)
        .then(() => {
            console.log('activating process queue to ', enable);
            if (enable === true) {
                console.log('resume worker');
                return queueManagerInstance.resumeWorker();
            } else {
                console.log('pause worker');
                return queueManagerInstance.pauseWorker();
            }
        })
        .then(() => res.status(200).json({message : 'status set'}))
        .catch((err: any) => {
            console.log(err);
            res.status(400).json({message: 'error setting status2'});
        });

        // queueManagerInstance.pauseWorker();
        // queueManagerInstance.setupWorker();
    });

    app.get('/api/process-queue/status', (req: Request, res: Response) => {
        Redis.getProcessQueueFlag()
        .then((status: any) => getBooleanFromString(status))
        .then((status: any) => res.json({status}));
    });
}
