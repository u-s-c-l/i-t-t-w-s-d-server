require("dotenv").config();

const { request } = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;
const collections = ["users", "scores"];
const seeds = {
  users: fs.readFileSync(__dirname + "userSeeds.js"),
  scores: fs.readFileSync(__dirname + "scoreSeeds.js"),
};

const resetTestDB = () => {
  return new Promise(async (res, rej) => {
    try {
      let client = await MongoClient.connect(connectionUrl);
      collections.forEach((item) => {
        client.db(dbName).collection(item).drop();
        client.db(dbName).collection(item).insertMany(seeds[`${item}`]);
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
