import * as Sequelize from "sequelize";
import db from "../../service/db";
import { PostCreateRequest } from "../request/PostCreateRequest";

export class Post extends Sequelize.Model {}
const Op = Sequelize.Op;

Post.init(
  {
    type: Sequelize.ENUM("text", "image", "video"),
    data: Sequelize.STRING,
    filename: Sequelize.STRING,
    source: Sequelize.INTEGER,
    campaign_id: Sequelize.INTEGER
  },
  {
    sequelize: db.get(),
    modelName: "post"
  }
);

// Post.sync({force: true})
// .then(() => {
//     Post.create({
//         type : 'image',
//         data : '',
//         filename: 'asfd-asdfasdfadf-adsff-adf',
//         source: 2
//     });
// });

export function create(param: PostCreateRequest): Promise<JSON> {
  return Post.create(param.getAll())
    .then((post: Post) => post.get({ plain: true }))
    .catch(err =>
      Promise.resolve({
        message: "Error creating Post",
        error: err.toJSON()
      })
    );
}

export function getAll() {
  return Post.findAll({
    limit: 10,
    order: [["createdAt", "DESC"]]
  })
    .map(el => el.get({ plain: true }))
    .catch(err => {
      return Promise.resolve({
        message: "Error creating Post",
        error: err
      });
    });
}

export function get(id: number) {
  return Post.findOne({
    where: {
      id
    }
  }).catch(err => console.log(err));
}

export function getByTime(d1: string, d2: string) {
  return Post.findAll({
    where: {
      createdAt: {
        [Op.between]: [d1, d2]
      }
    }
  }).catch(err => console.log(err));
}
