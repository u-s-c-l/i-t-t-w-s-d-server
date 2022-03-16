require("dotenv").config();

const { MongoClient } = require("mongodb");

console.log(process.env.NODE_ENV);
console.log(process.env.DB_CONNECTION);
console.log(process.env.SECRET);

const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;

const init = async () => {
  let client = await MongoClient.connect(connectionUrl);
  console.log(`Connected to database ${dbName}.`);
  return client.db(dbName);
};

module.exports = { init };
