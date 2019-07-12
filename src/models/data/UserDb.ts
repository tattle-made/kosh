import * as Sequelize from "sequelize";
import db from "../../service/db";
import ExistsResponse from "../data/ExistsResponse";
import { UserCreateRequest } from "../request/UserCreateRequest";

export class User extends Sequelize.Model {}

User.init(
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    role: Sequelize.STRING
  },
  {
    sequelize: db.get(),
    modelName: "user"
  }
);

// User.sync()
// .then(() => {
//     User.create({
//         username: 'user_aab',
//         password: 'abcdf',
//     });
// })
// .then((jane) => {
//     console.log(jane);
// });

// returns false and {}
// returns true and {userid : <id>}

export function exists(
  username: string,
  password: string
): Promise<ExistsResponse> {
  //DOUBT
  // why find and count all ? why count ?
  return User.findAndCountAll({
    where: {
      username,
      password
    }
  })
    .then(result => {
      if (result.count === 0) {
        return new ExistsResponse(false, -1);
      } else {
        return new ExistsResponse(true, result.rows[0].get("id") as number);
      }
    })
    .catch(err => {
      console.log(err);
    });
  // .then((user) => user.id != undefined ? true : false;)
}

export function createUser(param: UserCreateRequest): Promise<any> {
  return User.create(param.getAll())
    .then((user: User) => {
      return user.get();
    })
    .catch(err =>
      Promise.resolve({
        message: "Error creating User",
        error: err.toJSON()
      })
    );
}

export function updateUser(id: number, param: UserCreateRequest): Promise<any> {
  return User.update(
    {
      username: param.username,
      password: param.password,
      email: param.email,
      role: param.role
    },
    {
      where: {
        id
      }
    }
  )
    .then(user => {
      return user;
    })
    .catch(err =>
      Promise.resolve({
        message: "Error Updating User",
        error: err.toJSON()
      })
    );
}

export function deleteUser(id: number): Promise<any> {
  return User.destroy({
    where: {
      id
    }
  })
    .then(user => {
      return user;
    })
    .catch(err =>
      Promise.resolve({
        message: "Error Deleting User",
        error: err.toJSON()
      })
    );
}
