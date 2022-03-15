// require("dotenv").config();

const { MongoClient } = require("mongodb");

let client;
const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;
const collectionNames = ["users", "scores"];
const seeds = {
  users: [
    {
      username: "ewhite1999",
      password_digest:
        "$2a$10$tCppT1FG0aaUBFeYpFfDX..sitL9Hj4sHGyZHh6r5OUTLEvAcIorq",
    },
    {
      username: "gi-ba-bu",
      password_digest:
        "$2a$10$1r.PF9X3eD8KmZmIBdrK5ufokHBePZrNXv564aKijge2rZDp0hDju",
    },
    {
      username: "jalexxx",
      password_digest:
        "$2a$10$trsIf9zyAe.xiKQpanD5jOtD3if0lY.h4IQp/JfEsYCeL8m6rVHIe",
    },
    {
      username: "nplatton",
      password_digest:
        "$2a$10$ovlXEPRhziLESsFPZaxlNenr9f6orAFcVX0ed9MeEhEBJXBmybO0u",
    },
    {
      username: "saminakhan999",
      password_digest:
        "$2a$10$tr7TlkmfM8CAsbGCbA.ooe0GRAhjilm0eqhe6Ed3svL8BJCbCRVGK",
    },
  ],
  scores: [
    { cat: "maths", username: "ewhite1999", score: 20 },
    { cat: "physics", username: "nplatton", score: 23 },
    { cat: "movies", username: "saminakhan999", score: 18 },
    { cat: "animals", username: "gi-ba-bu", score: 23 },
    { cat: "movies", username: "jalexxx", score: 18 },
    { cat: "animals", username: "jalexxx", score: 12 },
  ],
};

const dropCollections = async (db) => {
  let collections = await db.listCollections().toArray();
  // The above returns array of objects: {name: "", options: {}, ...}
  collections = collections.map((collection) => collection.name);
  if (collections.includes("users")) {
    await db.collection("users").drop();
  }
  if (collections.includes("scores")) {
    await db.collection("scores").drop();
  }
};

const resetTestDB = () => {
  return new Promise(async (res, rej) => {
    try {
      client = await MongoClient.connect(connectionUrl);
      const db = client.db(dbName);
      await dropCollections(db);
      collectionNames.forEach(async (item) => {
        await db.collection(item).insertMany(seeds[`${item}`]);
      });
      res("Test DB reset");
    } catch (err) {
      rej(err);
    }
  });
};

const clearDB = () => {
  return new Promise(async (res, rej) => {
    try {
      const client = await MongoClient.connect(connectionUrl);
      const db = client.db(dbName);
      await dropCollections(db);
      res("Test DB cleared");
    } catch (err) {
      rej(err);
    }
  });
};

// const closeDB = () => {
//   return new Promise(async (res, rej) => {
//     try {
//       await client.close();
//     } catch (err) {
//       rej(err);
//     }
//   });
// };

const request = require("supertest");
const server = require("../../server");

global.request = request;
global.app = server;
global.resetTestDB = resetTestDB;
global.clearDB = clearDB;
// global.closeDB = closeDB;
global.port = process.env.PORT || 5000;
