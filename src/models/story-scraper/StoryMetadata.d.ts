import { IAuthor } from './IAuthor';
import { IDocsEntity } from './IDocsEntity';


export interface StoryMetadata {
    author: IAuthor;
    date_accessed: string;
    date_updated: string;
    docs?: (IDocsEntity)[] | null;
    domain: string;
    headline: string;
    postID: string;
    postURL: string;
}
