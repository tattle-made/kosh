export class AnnotationUser {
    constructor(public id: number, public name: string) {
        return;
    }

    public toString(): string {
        return `{ id : ${this.id}, name: ${this.name}}`;
    }
}
