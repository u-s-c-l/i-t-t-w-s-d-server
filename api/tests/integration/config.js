require("dotenv").config();

const { request } = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

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

const resetTestDB = () => {
  return new Promise(async (res, rej) => {
    try {
      let client = await MongoClient.connect(connectionUrl);
      collections.forEach((item) => {
        await client.db(dbName).collection(item).drop();
        await client.db(dbName).collection(item).insertMany(seeds[`${item}`]);
      });
      res("Test DB reset");
    } catch (err) {
      rej("Could not reset DB");
    }
  });
};

const request = require("supertest");
const server = require("../../server");

global.request = request;
global.app = server;
global.resetTestDB = resetTestDB;
