const db = connect("mongodb://localhost:27017/ittwsd");

db.users.drop();

// password = username
db.users.insertMany([
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
]);

db.scores.drop();

db.scores.insertMany([
  {cat: "maths", username: "ewhite1999", score: 20},
  {cat: "physics", username: "nplatton", score: 23},
  {cat: "movies", username: "saminakhan999", score: 18},
  {cat: "animals", username: "gi-ba-bu", score: 23},
  {cat: "movies", username: "jalexxx", score: 18}
 ])

 