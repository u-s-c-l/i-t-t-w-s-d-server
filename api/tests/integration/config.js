require("dotenv").config();

const { MongoClient } = require("mongodb");

let client;
const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;

const userSeeds = require("./userSeeds.json");
const scoreSeeds = require("./scoreSeeds.json");

const dropCollectionsAndReseed = async (db, reseed = true) => {
  let collections = await db.listCollections().toArray();
  // The above returns array of objects: {name: "", options: {}, ...}
  collections = collections.map((collection) => collection.name);
  if (collections.includes("users")) {
    await db.collection("users").drop();
  }
  if (collections.includes("scores")) {
    await db.collection("scores").drop();
  }
  if (reseed) {
    await db.collection("users").insertMany(userSeeds);
    await db.collection("scores").insertMany(scoreSeeds);
  }
};

const resetTestDB = (api = null) => {
  return new Promise(async (res, rej) => {
    try {
      client = await MongoClient.connect(connectionUrl);
      const db = client.db(dbName);
      await dropCollectionsAndReseed(db);
      res("DB reset");
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
      await dropCollectionsAndReseed(db, (reseed = false));
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
