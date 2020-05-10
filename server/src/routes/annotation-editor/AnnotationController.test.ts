import { AnnotationController } from './AnnotationController';
describe.only('Testing Annotation Controller Basic', () => {
    const annotationController = new AnnotationController();

    beforeAll(() => {
        annotationController.createRoom('123:abc');
        annotationController.createRoom('456:att');
        annotationController.createRoom('456:att');
        annotationController.createRoom('123:laa');
    });
    test('Prints Beautifully', () => {
        console.log(JSON.stringify(annotationController.toJSON(), null, '  '));
        expect(1).toBe(1);
    });
});
