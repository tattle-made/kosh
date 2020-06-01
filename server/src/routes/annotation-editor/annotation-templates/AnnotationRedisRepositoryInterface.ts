import { NohmModel } from 'nohm';

export interface AnnotationRedisRepositoryInterface<T, U extends NohmModel> {
    name: string;
    data: T;
    store: (data: T) => Promise<void>;
    getData: (key: string) => Promise<T>;
    updateValue: (key: string, keyName: string, value: string) => Promise<void>;
}
