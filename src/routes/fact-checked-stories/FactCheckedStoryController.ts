import _BaseController from '../../controllers/_BaseController';
import { FactCheckedStory } from './FactCheckedStoryDb';
import { CreateStoryRequestModel } from './CreateStoryRequestModel';


export class FactCheckedStoryController extends _BaseController {
    constructor() {
        super('Fact Checked Story Controller');
    }

    public create(data: CreateStoryRequestModel) {
        return FactCheckedStory.create(data.getJSONForStoringInFCStorySequelize());
    }
}
