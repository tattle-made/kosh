import * as AWS from 'aws-sdk';
import * as config from 'config';
import * as Promise from 'bluebird';
import * as Axios from 'axios';


const credentials: any = {
    accessKeyId: config.get('tattleServicesUI.awsAccessKey'),
    secretAccessKey : config.get('tattleServicesUI.secretAccessKey'),
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

