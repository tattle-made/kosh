import * as Sentry from '@sentry/node';

export function logMessage(message: string) {
    Sentry.captureMessage(message);
}

export function logError(err: any) {
    Sentry.captureException(err);
}

