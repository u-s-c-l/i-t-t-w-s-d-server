require("dotenv").config();

const { MongoClient } = require("mongodb");

const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;
const collections = ["users", "scores"];
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
    {
      username: "ewhite1999",
      categories: {
        animals: 2,
      },
    },
    {
      username: "gi-ba-bu",
      categories: {
        animals: 1,
      },
    },
    {
      username: "jalexxx",
      categories: {
        animals: 40,
      },
    },
    {
      username: "nplatton",
      categories: {
        animals: 3,
      },
    },
    {
      username: "saminakhan999",
      categories: {
        animals: 5,
      },
    },
  ],
};

const dropCollections = async (db) => {
  let collections = await db.listCollections().toArray();
  console.log(collections);
  // The above returns array of objects: {name: "", options: {}}
  collections = collections.map((collection) => collection.name);
  console.log(collections);
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
      const client = await MongoClient.connect(connectionUrl);
      const db = client.db(dbName);
      await dropCollections(db);
      collections.forEach(async (item) => {
        await db.collection(item).insertMany(seeds[`${item}`]);
      });
      res("Test DB reset");
    } catch (err) {
      rej(err);
    }
  });
};

const request = require("supertest");
const server = require("../../server");

global.request = request;
global.app = server;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;
