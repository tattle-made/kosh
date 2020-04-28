export class AnnotationUser {
    private id: number;
    private name: string;

    constructor() {
        return;
    }

    public toString(): string {
        return `{ id : ${this.id}, name: ${this.name}}`;
    }
}
