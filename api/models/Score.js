const { init } = require("../dbConfig/config");

class Score {
  constructor(data) {
    this.id = data._id;
    this.username = data.username;
    this.cat = data.cat;
    this.score = data.score;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoresData = await db.collection("scores").find().toArray();
        if (!scoresData.length) {
          throw new Error("No users found");
        }
        const scores = scoresData.map((d) => new Score(d));
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
        if (!scoreData.length) {
          console.log("error thrown");
          throw new Error("User not found");
        }
        const scores = scoreData.map((d) => new Score(d));
        res(scores);
      } catch (err) {
        rej(err);
      }
    });
  }

  static findByCategory(category) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoreData = await db
          .collection("scores")
          .find({ cat: { $eq: category } })
          .toArray();
        if (!scoreData.length) {
          console.log("error thrown");
          throw new Error("Category not found");
        }
        const scores = scoreData.map((d) => new Score(d));
        res(scores);
      } catch (err) {
        rej(err);
      }
    });
  }

  static findByUsernameAndCat(username, cat) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const scoreData = await db
          .collection("scores")
          .find({
            username: { $eq: username },
            cat: { $eq: cat },
          })
          .toArray();
        if (!scoreData.length) {
          throw new Error("Username with category not found");
        }
        const score = new Score(scoreData[0]);
        res(score);
      } catch (err) {
        rej(err);
      }
    });
  }

  static get getLeadersBoard() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const database = db.collection("scores");
        const fields = await database.distinct("cat");
        if (!fields.length) {
          throw new Error("No scores available");
        }

        const leaders = [];

        for (const field of fields) {
          const sortedScores = await database
            .aggregate([{ $match: { cat: field } }, { $sort: { score: -1 } }])
            .toArray();
          let fieldMax = sortedScores[0].score;

          const TopScores = await database
            .aggregate([{ $match: { cat: field, score: fieldMax } }])
            .sort({ _id: -1 })
            .limit(1)
            .toArray();

          leaders.push(TopScores[0]);
        }

        res(leaders);
      } catch (err) {
        rej(err);
      }
    });
  }

  static updateScore(username, cat, newscore) {
    //Update or Insert
    return new Promise(async (res, rej) => {
      try {
        if (!username || !cat || !newscore) {
          throw new Error("Insufficient arguments");
        }
        const db = await init();
        let documnt = await db
          .collection("scores")
          .find({ username: { $eq: username }, cat: { $eq: cat } })
          .toArray();

        if (documnt.length && documnt[0].score <= newscore) {
          await db
            .collection("scores") //delete
            .deleteOne({ username: { $eq: username }, cat: { $eq: cat } });
        }

        if (!documnt.length || documnt[0].score <= newscore) {
          await db
            .collection("scores") // insert
            .insertOne({ username: username, cat: cat, score: newscore });
        }

        res("Updated or inserted successfully");
      } catch (err) {
        rej(err);
      }
    });
  }

  static destroy(username) {
    return new Promise(async (res, rej) => {
      try {
        if (username.length > 20) {
          throw new Error("Username is too long");
        }
        const db = await init();
        await db
          .collection("scores")
          .deleteMany({ username: { $eq: username } });
        res("Scores deleted");
      } catch (err) {
        rej(err);
      }
    });
  }
}

module.exports = Score;
