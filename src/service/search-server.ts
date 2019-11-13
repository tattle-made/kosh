import * as config from 'config';
import Axios, {AxiosResponse} from 'axios';
import {Post, get, deduceMediaUrl, appendMediaUrlToPost} from '../models/data/PostDb';
import {User} from '../models/data/UserDb';
import {Promise} from 'bluebird';
const searchServerConfig: any = config.get('search-server');

/*
todo: video api is not deployed yet
*/
export class SearchServer {
    private host: string = `${searchServerConfig.host}:${searchServerConfig.port}`;
    private IMAGE_ENDPOINT: string = `${this.host}/upload_image`;
    private VIDEO_ENDPOINT: string = '/upload_video';
    private TEXT_ENDPOINT: string = '/upload_text';
    private STORY_ENDPOINT: string = '/search_tags';

    // public indexPost(post: Post) {
    //     const type: string = post.get('type') as string;
    //     const postId: number = post.get('id') as number;

    //     switch (type) {
    //         case 'text':
    //             return this.indexText(postId, post.get('data') as string);
    //         case 'image':
    //             return this.indexImage(postId, 'url');
    //         case 'video':
    //             return this.indexImage(postId, 'temp_url');
    //     }
    // }

    public indexPostLoose(data: any): Promise<AxiosResponse<any>> {
        if (data.type === 'image') {
            return this.indexImage(data.postId, data.mediaUrl, data.source);
        } else {
            return this.indexImage(data.postId, data.mediaUrl, data.source);
        }
    }

/**
 * indexImage makes an API call to search server in order to make an image searchable
 * @param fileName name of the file in tattle's s3 bucket
 */
    private indexImage(postId: number, imageUrl: string, source: string) {
        return Axios.post('http://3.130.147.43:7000/upload_image', {
            doc_id: postId,
            image_url: imageUrl,
            source,
        })
        .then((response) => response.data);
    }

    private indexVideo(postId: number, videoUrl: string) {
        return Axios.post(this.VIDEO_ENDPOINT, {
            doc_id: postId,
            video_url: videoUrl,
        });
    }

    private indexText(postId: number, text: string) {
        return Axios.post(this.TEXT_ENDPOINT, {
            doc_id: postId,
            text,
        });
    }

    // public findSimilarStories() {
    //     return Axios.post('/find_duplicate_by_source', {
    //         url: 'www.google.com',
    //         source: 'story-scraper',
    //     })
    //     .then((response) => response.data)
    //     .then(({doc_id}) => get(doc_id))
    //     .then((post) => {
    //         return Axios.get(`http://52.66.83.191:5001/?
    //         postId=${post.get('id')}&minimal=true`)
    //     })
    //     .then((metadata) => {
    //         return({
    //             data: 'hi',
    //         });
    //     })
    //     .catch((err) => console.log('error getting data'));
    // }

    public findDuplicate(imageUrl: string, threshold: number) {
        return Axios.post('http://3.130.147.43:7000/find_duplicate', {
            image_url: imageUrl,
            threshold,
        })
        .then((result) => result.data)
        .then((data) => get(data.doc_id))
        .then((result) => appendMediaUrlToPost(result as Post))
        .catch((err) => console.log('FIND DUPLICATE ERROR', err));
    }

    public searchTag(tag: string) {
        return Axios.post('http://3.130.147.43:7000/search_tags', {
            tags: [tag],
        })
        .then((result) => { console.log('1', result); return result; })
        .then((result) => result.data.docs.splice(0, 5))
        .then((docIds) => Promise.all(docIds.map( (docId: number) => (
            get(docId).then((result) => appendMediaUrlToPost(result as Post))
        ))))
        // .then((data) => get(data.doc_id))
        // .then((result) => {
        //     if (result instanceof Post) {
        //         const data: any = result.get({plain: true});
        //         const mediaUrl = deduceMediaUrl(
        //             data.user.mediaSource.serviceName,
        //             data.user.mediaSource.dirName,
        //             data.filename);

        //         return { ...data, mediaUrl };
        //     } else {
        //         return result;
        //     }
        // })
        .catch((err) => console.log('FIND DUPLICATE ERROR', err));
    }
}
