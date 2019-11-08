export class CreateStoryRequestModel {
    public url!: string;
    public storyId!: string;
    public docId!: string;
    public type!: string;

    public isValid(): boolean {
        if ( this.url !== undefined && this.docId !== undefined && this.type !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    public getJSONForSequelize() {
        return {
            url: this.url,
            storyId: this.storyId,
            docId: this.docId,
            type: this.type,
        };
    }

    public getJSONForQueue() {
        return {
            url: this.url,
            storyId: this.storyId,
            docId: this.docId,
            type: this.type,
        };
    }
}
