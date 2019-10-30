import * as config from 'config';
import Axios from 'axios';
import {Post} from '../models/data/PostDb';
const searchServerConfig: any = config.get('search-server');

/*
todo: video api is not deployed yet
*/
export class SearchServer {
    private host: string = `${searchServerConfig.host}:${searchServerConfig.port}`;
    private const IMAGE_ENDPOINT: string = `${this.host}/upload_image`;
    private const VIDEO_ENDPOINT: string = '/upload_video';
    private const TEXT_ENDPOINT: string = '/upload_text';

    public indexPost(post: Post) {
        const type: string = post.get('type') as string;
        const postId: number = post.get('id') as number;

        switch (type) {
            case 'text':
                return this.indexText(postId, post.get('data') as string);
            case 'image':
                return this.indexImage(postId, 'temp_url');
            case 'video':
                return this.indexImage(postId, 'temp_url');
        }
    }

/**
 * indexImage makes an API call to search server in order to make an image searchable
 * @param fileName name of the file in tattle's s3 bucket
 */
    private indexImage(postId: number, imageUrl: string) {
        return Axios.post(this.IMAGE_ENDPOINT, {
            doc_id: postId,
            image_url: imageUrl,
        });
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
}
