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
  {cat: "maths", username: "jalexxx", low: {nmbrgames: 3, top_score: 33}, medium: {nmbrgames: 1, top_score: 33}, hard: {nmbrgames: 1, top_score: 10} },
  {cat: "physics",username: "nplatton", low: {nmbrgames: 3, top_score: 33}, medium: {nmbrgames: 2, top_score: 33} },
  {cat: "movies", username:"saminakhan999", medium: {nmbrgames: 4, top_score: 33} },
  {cat: "animals", username:"gi-ba-bu", medium: {nmbrgames: 4, top_score: 33} },
  {cat: "science", username:"ewhite1999", medium: {nmbrgames: 4, top_score: 33} }

 ])
