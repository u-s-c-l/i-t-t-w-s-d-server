const { init } = require("../dbConfig/config");

class Score {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.cat = data.cat;
    this.low = data.low;
    this.medium = data.medium;
    this.hard = data.hard;

  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoresData = await db
          .collection("scores")
          .find()
          .toArray();
        if (!scoresData.length) {throw new Error('No user found')}
        const scores = scoresData.map( d => new Score(d))
        res(scores);
      } catch (err) {
        rej(err);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoreData = await db
          .collection("scores")
          .find({ username: { $eq: username } })
          .toArray();
        if (!scoreData.length) {throw new Error('User not found')}
        const data = new Score(scoreData[0]);
        res(data);
      } catch (err) {
        rej(err);
      }
    });
  }

  //score provided as a percentage
  // static create(username,cat,level,score) {
  //   return new Promise(async (res, rej) => {
  //     try {
  //       data = {}
  //       const db = await init();
  //       await db.collection("scores").insertOne(data);
  //       res("Score entry created");
  //     } catch (err) {
  //       rej(err);
  //     }
  //   });
  // }

  destroy() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        await db
          .collection("scores")
          .deleteOne({ username: { $eq: this.username } });
        res("Scores deleted");
      } catch (err) {
        rej(err);
      }
    });
  }
}

  


module.exports = Score;
