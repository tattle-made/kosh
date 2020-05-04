import * as Sequelize from 'sequelize';
import db from '../../service/db';
import { MetadataIndexCreateRequest } from '../request/PostMetadataRequest';
import { get as getText } from './PostMetadata/MetadataText';
import { get as getNumber } from './PostMetadata/MetadataNumber';
import { get as getDate } from './PostMetadata/MetadataDate';
import { get as getDateRange } from './PostMetadata/MetadataDateRange';
import { get as getLatLong } from './PostMetadata/MetadataLatLong';

export class MetadataIndex extends Sequelize.Model {}
const Op = Sequelize.Op;

const fetchFuncMap: any[] = [
        null, // fetchFuncMap[0] should never be called 
        getText,
        getNumber,
        getDate,
        getDateRange,
        getLatLong
    ];

MetadataIndex.init(
    {
        metadata_type: Sequelize.INTEGER,
        metadata_id: Sequelize.INTEGER,
        post_id: Sequelize.INTEGER,
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_index',
        modelName: 'metadataIndex',
        timestamps: false
    },
);

//Post.belongsTo(User);

export function create(param: MetadataIndexCreateRequest): Promise<any> {
    return MetadataIndex.create(param.getAll())
        .then( (item: MetadataIndex) => Promise.resolve(item!.get({ plain: true })) )
        .catch((err) =>
            Promise.resolve({
                message: 'Error Creating Index item',
                error: JSON.stringify(err),
            })
        );
}

export function getMetadataByPost(post_id: number): Promise<any> {
    return MetadataIndex.findAll({
        where: {
            post_id: post_id,
        }
    })
    .then((items) => {
        let records : any[] = [];
        let p: Promise<any> = Promise.resolve();
        for(let item of items)
        {
            p = p.then(() => {
                let obj: any = item!.get({ plain :true });
                return fetchFuncMap[obj.metadata_type](obj.metadata_id)
                .then((details:any) => {
                    records.push(details);
                    return;
                });
            });            
        }
        return p.then(() => {
            return records;
        });
    });
}

export function get(id: number) {
    return MetadataIndex.findOne({
        where: {
            id,
        }
    })
    .then( (item) => Promise.resolve(item!.get({ plain: true })) )
    .catch((err) => 
        Promise.resolve({
            message: 'Error get Index item',
            error: err,
        })
    );
}