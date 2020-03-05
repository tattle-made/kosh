
import Axios, {AxiosResponse} from 'axios';
import {Post, get, deduceMediaUrl, appendMediaUrlToPost} from '../models/data/PostDb';
import {User} from '../models/data/UserDb';
import {Promise} from 'bluebird';
import { getStoryByPostId } from '../routes/fact-checked-stories/FactCheckedStoryDb';
/*
todo: video api is not deployed yet
*/
export class SearchServer {
    private host: string = `${process.env.SEARCH_HOST}:${process.env.SEARCH_PORT}`;
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

    // todo currently duplicate only returns the first matching duplicate. make it an array
    public findDuplicate(imageUrl: string) {
        return Axios.post('http://3.130.147.43:7000/find_duplicate', {
            image_url: imageUrl,
        })
        .then((result) => result.data)
        .then((data) => {
            if (data.failed === 1) {
                Promise.reject('no duplicate found');
            } else {
                const duplicate = data.result.filter((item: any) => item.dist === 0);

                if (duplicate.length === 1) {
                    return duplicate[0];
                } else {
                    Promise.reject('unknown error');
                }
            }
        })
        .then((data) => get(data.doc_id))
        .then((result) => ({
            id: result.id,
            type: result.type,
            mediaUrl: result.mediaUrl,
            heading: result.user.username,
            timestamp: result.createdAt,
        }))
        .catch((err) => Promise.reject(err));
    }

    public findDuplicateStories(imageUrl: string) {
        console.log('Finding Duplicate Stories for ', imageUrl);
        const THRESHOLD = 2;

        return Axios.post('http://3.130.147.43:7000/find_duplicate', {
            image_url: imageUrl,
        })
        .then((result) => result.data)
        .then((data) => {
            if (data.failed === 1) {
                Promise.reject('no duplicate found');
            } else {
                // tslint:disable-next-line:max-line-length
                const duplicateStories = data.result.filter((item: any) => item.source === 'story-scraper');

                if (duplicateStories.length === 0) {
                    Promise.reject('unknown error');
                } else {
                    return duplicateStories.splice(0, 5);
                }
            }
        })
        .then((stories) => {
            // console.log('stories: ', stories);
            return Promise.all(stories.map((story: any) => get(story.doc_id)));
        })
        .then((posts: any) => {
            // console.log('posts: ', posts);
            return Promise.all(posts.map((post: any) => getStoryByPostId(post.id)));
        })
        .then((docs) => {
            return Promise.all(docs.map((doc: any) => {
                // tslint:disable-next-line:max-line-length
                return Axios.get(`${process.env.FCSEARCH_HOST}/metadataFromDoc?docId=${doc.docId}`)
                .then((res) => res.data);
            }));
        })
        .then((metadata) => {
            // console.log(metadata);
            return metadata.map((item: any) => {
                return {
                    title: item.headline,
                    url: item.postURL,
                    timestamp: item.date_updated,
                    domain: item.domain,
                };
            });
        })
        .catch((err) => {
            console.log('error finding duplicates', err);
            return Promise.reject(err);
        });
    }

    public findTextWithinImage(text: string) {
        return Axios.post(`${process.env.SEARCH_HOST}:${process.env.SEARCH_PORT}/find_duplicate`, {
            text,
        })
        .then((result) => result.data)
        .then((data) => {
            if (data.failed === 1) {
                Promise.reject('no duplicate found');
            } else {
                if (data.result.length === 0) {
                    Promise.reject('unknown error');
                } else {
                    return data.result.splice(0,5);
                }
            }
        })
        .then((duplicates) => {
            return Promise.all(duplicates.map((duplicate: any) => {
                return get(duplicate.doc_id);
            }));
        })
        .then((posts: any) => Promise.all(posts.map((post: any) => getStoryByPostId(post.id) )))
        .then((docs) => {
            return Promise.all(docs.map((doc: any) => {
                // tslint:disable-next-line:max-line-length
                console.log(doc);
                return Axios.get(`http://52.66.83.191:5001/api/metadata?docId=${doc.docId}`)
                .then((res) => res.data);
            }));
        })
        .then((metadata) => {
            return metadata.map((item: any) => {
                return {
                    title: item.headline,
                    url: item.postURL,
                    timestamp: item.date_updated,
                };
            });
        })
        .catch((err) => Promise.reject(err));
    }

    public searchTag(tag: string) {
        return Axios.post('http://3.130.147.43:7000/search_tags', {
            tags: [tag],
        })
        .then((result) => result.data.docs.splice(0, 5))
        .then((docIds) => Promise.all(docIds.map( (docId: number) => (
            get(docId).then((result) => appendMediaUrlToPost(result as Post))
        ))))
        .then((posts) => {
            return posts.map((post: any) => {
                return({
                    id: post.id,
                    type: post.type,
                    mediaUrl: post.mediaUrl,
                });
            });
        })
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
