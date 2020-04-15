import * as Sentry from '@sentry/node';

export function logMessage(message: string) {
    if (process.env.type === 'DEVELOPMENT') {
        console.log(message);
    } else {
        Sentry.captureMessage(message);
    }
}

export function logError(err: any) {
    if (process.env.type === 'DEVELOPMENT') {
        console.log(err);
    } else {
        Sentry.captureException(err);
    }
}
