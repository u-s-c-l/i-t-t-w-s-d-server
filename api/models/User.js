const res = require("express/lib/response");
const { init } = require("../dbConfig/config");

class User {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.passwordDigest = data.password_digest;
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

  static create(data) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db.collection("users").insertOne(data);
        res("User created");
      } catch (err) {
        rej(err);
      }
    });
  }

  updatePassword(newPassword) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db
          .collection("users")
          .findOneAndUpdate(
            { username: { $eq: this.username } },
            { $set: { password_digest: newPassword } }
          );
        res("Password updated");
      } catch (err) {
        rej(err);
      }
    });
  }

  destroy() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db
          .collection("users")
          .deleteOne({ username: { $eq: this.username } });
        res("User deleted");
      } catch (err) {
        rej(err);
      }
    });
  }
}

module.exports = User;
