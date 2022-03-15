describe("successful endpoints", () => {
  let api;

  beforeAll(async () => {
    await resetTestDB();
    api = app.listen(port, () =>
      console.log("Test server running on port 5000...")
    );
  });

  beforeEach(async () => {
    await resetTestDB();
  });

  afterAll(async () => {
    console.log("Stopping test server");
    await api.close((err) => {});
  });

  describe("user", () => {
    describe("index", () => {
      test("it should return all users", async () => {
        const res = await request(api).get("/users");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(5);
      });
    });

    describe("findByUsername", () => {
      test("it should retrieve user based on username", async () => {
        const res = await request(api).get("/users/jalexxx");
        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual("jalexxx");
      });
    });
  });

  describe("score", () => {
    describe("index", () => {
      test("it should retrieve all users scores", async () => {
        const res = await request(api).get("/scores");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(6);
      });
    });

    describe("findByUsername", () => {
      test("it should retrieve all cat data for user", async () => {
        const res = await request(api).get("/scores/username/jalexxx");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
      });

      test("it should return 403 if no user", async () => {
        const res = await request(api).get("/scores/username/tester");
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("findByCategory", () => {
      test("it should retrieve all scores for a category", async () => {
        const res = await request(api).get("/scores/cat/movies");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
      });

      test("it should retrieve all scores for a category", async () => {
        const res = await request(api).get("/scores/cat/physics");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
      });

      test("it should return 403 if no category", async () => {
        const res = await request(api).get("/scores/cat/test");
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("findByUsernameAndCat", () => {
      test("it should retrieve score for given username and category", async () => {
        const res = await request(api).get(
          "/scores/username/jalexxx/cat/movies"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.score).toEqual(18);
      });

      test("it should retrieve score for given username and category", async () => {
        const res = await request(api).get(
          "/scores/username/gi-ba-bu/cat/animals"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body.score).toEqual(23);
      });

      test("it should return 403 if no score for given pair", async () => {
        const res = await request(api).get(
          "/scores/username/gi-ba-bu/cat/movies"
        );
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("returnLeadersBoard", () => {
      test("it retrieves array of highest scores", async () => {
        const res = await request(api).get("/scores/leadersboard");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(4);
      });
    });

    describe("destroy", () => {
      test("it destroys a users data", async () => {
        const res = await request(api)
          .delete("/scores/username/nplatton")
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(204);
      });
    });
  });

  describe("auth", () => {
    describe("login", () => {
      test("it ", async () => {
        const res = await request(api)
          .post("/auth/login")
          .send(JSON.stringify({ username: "jalexxx", password: "jalexxx" }))
          .set("Content-Type", "application/json");
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
      });
    });

    describe("register", () => {
      test("it ", async () => {
        const res = await request(api)
          .post("/auth/register")
          .send(JSON.stringify({ username: "jalexxx", password: "jalexxx" }))
          .set("Content-Type", "application/json");
        expect(res.statusCode).toEqual(201);
        expect(res.body.msg).toMatch(/user created/i);
      });
    });
  });
});
