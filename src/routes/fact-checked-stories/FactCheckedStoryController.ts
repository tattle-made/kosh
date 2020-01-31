import _BaseController from '../../controllers/_BaseController';
import { FactCheckedStory, getAll } from './FactCheckedStoryDb';
import { CreateStoryRequestModel } from './CreateStoryRequestModel';
import { GetFactCheckStoryRequestModel } from './GetFactCheckStoryRequestModel';


export class FactCheckedStoryController extends _BaseController {
    constructor() {
        super('Fact Checked Story Controller');
    }

    public create(data: CreateStoryRequestModel) {
        return FactCheckedStory.create(data.getJSONForStoringInFCStorySequelize());
    }

    public getAll(data: GetFactCheckStoryRequestModel) {
        return getAll(data);
    }
}
