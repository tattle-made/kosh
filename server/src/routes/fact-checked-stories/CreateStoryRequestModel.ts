export class CreateStoryRequestModel {
    public url!: string;
    public storyId!: string;
    public docId!: string;
    public type!: string;
    public filename!: string;
    public userId: number = 164;
    public postId!: number;

    public isValid(): boolean {
        if ( this.url !== undefined && this.docId !== undefined && this.type !== undefined
            && this.storyId !== undefined && this.filename !== undefined
            && this.userId !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    public getJSONForStoringInPostSequelize() {
        return {
            type: this.type,
            data: '',
            filename: this.filename,
            userId: this.userId,
        };
    }


    public getJSONForStoringInFCStorySequelize() {
        return {
            type: this.type,
            postId: this.postId,
            url: this.url,
            docId: this.docId,
            storyId: this.storyId,
        };
    }

    public getJSONForQueue() {
        return {
            mediaUrl: this.url,
            type: this.type,
            postId: this.postId,
            source: 'story-scraper',
        };
    }
}
