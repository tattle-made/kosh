import * as Sequelize from 'sequelize';
import db from '../../service/db';

export class MediaSource extends Sequelize.Model {}

MediaSource.init(
    {
        serviceName: Sequelize.ENUM('aws', 'firebase'),
        dirName: Sequelize.STRING,
    },
    {
        sequelize: db.get(),
        modelName: 'mediaSource',
    },
);

// MediaSource.sync({alter: true})
// .then(() => {
//     console.log('media source synced');
// })
// .catch((err) => console.log(err));

// MediaSource.create({serviceName: 'aws', dirName: 'temp-story-scrape-store'})
// .then((res) => console.log('media source created ', res))
// .catch((err) => console.log(err));

