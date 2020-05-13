import BaseController from '../../controllers/_BaseController';
import { getMetadata, get as getMetadataIndex, getMetadataByItemId, getChangesByPost, getChangesByPostTemplate, getChangesByPostTemplateAndUser } from '../../models/data/MetadataIndex';
import {MetadataTextUpdateRequest, MetadataNumberUpdateRequest, MetadataDateUpdateRequest, MetadataDateRangeUpdateRequest, MetadataLatLongUpdateRequest} from '../../models/request/PostMetadataRequest';
import { update as updateText } from '../../models/data/PostMetadata/MetadataText';
import { update as updateNumber } from '../../models/data/PostMetadata/MetadataNumber';
import { update as updateDate } from '../../models/data/PostMetadata/MetadataDate';
import { update as updateDateRange } from '../../models/data/PostMetadata/MetadataDateRange';
import { update as updateLatLong } from '../../models/data/PostMetadata/MetadataLatLong';

export class MetadataController extends BaseController {
    constructor() {
        super('temp');
    }
    
    public get(postId: number, templateId: number) {
        return getMetadata(postId, templateId);
    }
    
    public saveByTemplate(postId: number, templateId: number, data: any, userId: number) {
    	let changes = JSON.parse(data);
    	let p: Promise<any> = Promise.resolve();
    	for(var itemId in changes)
    	{
    		p = p.then(() => getMetadataByItemId(itemId))
    			.then((itemDetails) => {
    				let needToUpdate:boolean = false;
    				if((itemDetails.metadata_type == 1 && changes[itemId] != itemDetails.value) ||
    					(itemDetails.metadata_type == 2 && changes[itemId] != itemDetails.value) ||
    					(itemDetails.metadata_type == 3 && changes[itemId] != itemDetails.value) ||
    					(itemDetails.metadata_type == 4 && changes[itemId].start_date != itemDetails.start_date || changes[itemId].end_date != itemDetails.end_date) ||
    					(itemDetails.metadata_type == 5 && changes[itemId].latitude != itemDetails.latitude || changes[itemId].longitude != itemDetails.longitude))
	    				needToUpdate = true;

    				if(needToUpdate)
    				{
    					if(itemDetails.metadata_type >= 4) changes[itemId] = JSON.stringify(changes[itemId]);
    					return Promise.resolve(this.update(itemDetails.post_id, itemDetails.id, changes[itemId], userId));
    				}
    				else return Promise.resolve();
    			});
    	}
        return;
    }

    public update(postId: number, itemId: number, value: any, userId: number) {
    	return getMetadataIndex(itemId)
    	.then(indexRecord => {
    		if(!indexRecord.hasOwnProperty('metadata_type'))
    			return {'success': false};
    		let itemType = indexRecord.metadata_type;
    		let updateRequest = this.generateUpdateRequest(itemId, itemType, value, userId);
    		let updateFunc;
    		switch(itemType)
    		{
    			case 1: return updateText(updateRequest as MetadataTextUpdateRequest); break;
    			case 2: return updateNumber(updateRequest as MetadataNumberUpdateRequest); break;
    			case 3: return updateDate(updateRequest as MetadataDateUpdateRequest); break;
    			case 4: return updateDateRange(updateRequest as MetadataDateRangeUpdateRequest); break;
    			case 5: return updateLatLong(updateRequest as MetadataLatLongUpdateRequest); break;
    		}
    	});
    }

    private generateUpdateRequest(itemId: number, itemType: number, value: any, userId: number) {
    	const currentDate = new Date();
		const currentLocalDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000);
		const currentLocalTime = currentLocalDate.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    	if(itemType == 1) // Text
			return new MetadataTextUpdateRequest({
				id: itemId, 
				value, 
				created_by: userId, 
				created_at: currentLocalTime
			});
		else if(itemType == 2) // Number
			return new MetadataNumberUpdateRequest({
				id: itemId, 
				value: Number(value),
				created_by: userId, 
				created_at: currentLocalTime
			});
		else if(itemType == 3) // Date
			return new MetadataDateUpdateRequest({
				id: itemId, 
				date:value, 
				created_by: userId, 
				created_at: currentLocalTime
			});
		else if(itemType == 4) // DateRange
		{
			const dates = JSON.parse(value);
			return new MetadataDateRangeUpdateRequest({
				id: itemId, 
				start_date: dates.start_date, 
				end_date: dates.end_date, 
				created_by: userId, 
				created_at: currentLocalTime
			});
		}
		else if(itemType == 5) // LatLong
		{
			const coordinates = JSON.parse(value);
			return new MetadataLatLongUpdateRequest({
				id: itemId, 
				latitude: coordinates.latitude, 
				longitude: coordinates.longitude, 
				created_by: userId, 
				created_at: currentLocalTime
			});	
		}
    }

    public getChangesByPost(postId: number)
    {
    	return getChangesByPost(postId);
    }

    public getChangesByPostTemplate(postId: number, templateId: number)
    {
    	return getChangesByPostTemplate(postId, templateId);
    }

    public getChangesByPostTemplateAndUser(postId: number, templateId: number, userId: number)
    {
    	return getChangesByPostTemplateAndUser(postId, templateId, userId);
    }

}
