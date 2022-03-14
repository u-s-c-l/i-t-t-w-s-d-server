const db = connect("mongodb://localhost:27017/ittwsd");

db.users.drop();

db.users.insertMany([
  {
    username: "test",
    password_digest: "test",
  },
]);
