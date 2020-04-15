import { Express, Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import S3Helper from './S3-helper';

/**
 * todo : send success response, send failure response
 * @param app
 */
export function register(app: Express) {
    app.post('/api/s3-auth', (req: Request, res: Response) => {
        console.log('gettin s3 auth');
        S3Helper.s3.getSignedUrl('putObject', {
            Bucket: 'tattle-services-search',
            Key: req.body.filename,
            ContentType: req.body.type,
            Expires: 300,
          }, (err, url) => {
              if (err) {
                  res.json({error : err});
              } else {
                  res.json({signedUrl: url});
              }
          });
    });
}