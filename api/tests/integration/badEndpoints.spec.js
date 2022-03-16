describe("user endpoints", () => {
  let api;
  let token;

  beforeAll(async () => {
    api = app.listen(port, () =>
      console.log("Test server running on port 5000...")
    );
    await resetTestDB();
    const loginResponse = await request(api)
      .post("/auth/login")
      .send({ username: "nplatton", password: "nplatton" })
      .set("Accept", "application/json");
    token = loginResponse._body.token;
    await clearDB();
  }, 100000);

  afterAll(async () => {
    console.log("Stopping test server");
    // await closeDB();
    await api.close((err) => {});
  });

  describe("user", () => {
    describe("index", () => {
      test("it should return 404 error if no users found", async () => {
        const res = await request(api)
          .get("/users")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });

    describe("findByUsername", () => {
      test("it should return 404 error if no user found", async () => {
        const res = await request(api)
          .get("/users/jalexxx")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });
  });

  describe("score", () => {
    describe("index", () => {
      test("it should return 404 error if no users/scores found", async () => {
        const res = await request(api)
          .get("/scores")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });

    describe("findByUsername", () => {
      test("it returns 404 if no user found", async () => {
        const res = await request(api)
          .get("/scores/username/jalexxx")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });

    describe("findByCategory", () => {
      test("it returns 404 if no category found", async () => {
        const res = await request(api)
          .get("/scores/cat/movies")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });

    describe("findByUsernameAndCat", () => {
      test("it returns 404 if no match for given username and category", async () => {
        const res = await request(api)
          .get("/scores/username/jalexxx/cat/movies")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });

    describe("returnLeadersBoard", () => {
      test("it returns 404 if no users found", async () => {
        const res = await request(api)
          .get("/scores/leadersboard")
          .set("authorization", `${token}`)
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(404);
      });
    });

    // describe("destroy", () => {
    //   test("it returns 500 error in case of failure", async () => {
    //     const res = await request(api)
    //       .delete("/scores/username/jalexxx")
    //       .set("authorization", `${token}`)
    //       .set("Accept", "application/json");
    //     expect(res.statusCode).toEqual(500);
    //   });
    // });
  });

  describe("verifyToken", () => {
    test("it returns 403 if no header provided", async () => {
      const res = await request(api).get("/users");
      expect(res.statusCode).toEqual(403);
    });
  });
});
