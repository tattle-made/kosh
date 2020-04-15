export class PostIndexJobCreateModel {
    public mediaUrl!: string;
    public type!: string;
    public id!: number;
    public source: string = 'tattle-admin';

    public isValid(): boolean {
        if ( this.mediaUrl !== undefined && this.type !== undefined &&
            this.id !== undefined && this.source !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    public getJSONForSequelize() {
        return {
            mediaUrl: this.mediaUrl,
            type: this.type,
            postId: this.id,
            source: this.source,
        };
    }

    public getJSONForQueue() {
        return {
            mediaUrl: this.mediaUrl,
            type: this.type,
            postId: this.id,
            source: this.source,
        };
    }
}
