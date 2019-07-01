export default class {
    private id: string;
    private title: string;
    private tags: string[];

    constructor(id: string, title: string, tags: string[]) {
        this.id = id;
        this.title = title;
        this.tags = tags;
    }
}
