import { AnnotationController } from './AnnotationController';
describe.only('Testing Annotation Controller Basic', () => {
    const annotationController = new AnnotationController();

    beforeAll(() => {
        return;
    });
    test('Duplicate rooms arent created', () => {
        annotationController.createRoom('123:abc');
        annotationController.createRoom('456:att');
        annotationController.createRoom('456:att');
        annotationController.createRoom('123:laa');

        expect(annotationController.toJSON().rooms.length).toBe(3);
    });
});
