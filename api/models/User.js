const { init } = require("../dbConfig/config");

class User {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.password = data.password_digest;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const usersData = await db
          .collection("users")
          .find()
          .toArray();
        const users = usersData.map( d => new User(d))
        res(users);
      } catch (err) {
        rej(err);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const userData = await db
          .collection("users")
          .find({ username: { $eq: username } })
          .toArray();
        const user = new User(userData[0]);
        res(user);
      } catch (err) {
        rej(err);
      }
    });
  }
}

module.exports = User;
