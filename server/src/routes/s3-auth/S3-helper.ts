import * as AWS from 'aws-sdk';
import * as Promise from 'bluebird';
import * as Axios from 'axios';

const credentials: any = {
    accessKeyId: process.env.TATTLE_UI_AWS_ACCESS_KEY,
    secretAccessKey : process.env.TATTLE_UI_AWS_SECRET_ACCESS_KEY,
};

AWS.config.update({credentials, region: 'ap-south-1'});
const s3 = new AWS.S3();

const uploadFile = (signedUrl: string, fileType: string, file: FileList) => {
    const options = {
        headers: {
            'Content-Type': fileType,
        },
    };
    // return Axios.put(signedUrl, file, options)
};

export default  {
    s3,
    uploadFile,
};

