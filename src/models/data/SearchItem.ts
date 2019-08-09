export default class {
    private id: string;
    private title: string;
    private type: string;
    private tags: string[];

    constructor(id: string, title: string, type: string, tags: string[]) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.tags = tags;
    }
}
