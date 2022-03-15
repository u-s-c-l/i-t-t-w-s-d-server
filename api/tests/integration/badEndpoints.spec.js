describe("user endpoints", () => {
  let api;

  beforeAll(async () => {
    await clearDB();
    api = app.listen(port, () =>
      console.log("Test server running on port 5000...")
    );
  });

  afterAll(async () => {
    console.log("Stopping test server");
    // await closeDB();
    await api.close((err) => {});
  });

  describe("user", () => {
    describe("index", () => {
      test("it should return 403 error if no users found", async () => {
        const res = await request(api).get("/users");
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("findByUsername", () => {
      test("it should return 403 error if no user found", async () => {
        const res = await request(api).get("/users/jalexxx");
        expect(res.statusCode).toEqual(403);
      });
    });
  });

  describe("score", () => {
    describe("index", () => {
      test("it should return 403 error if no users/scores found", async () => {
        const res = await request(api).get("/scores");
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("findByUsername", () => {
      test("it returns 403 if no user found", async () => {
        const res = await request(api).get("/scores/username/jalexxx");
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("findByCategory", () => {
      test("it returns 403 if no category found", async () => {
        const res = await request(api).get("/scores/cat/movies");
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("findByUsernameAndCat", () => {
      test("it returns 403 if no match for given username and category", async () => {
        const res = await request(api).get(
          "/scores/username/jalexxx/cat/movies"
        );
        expect(res.statusCode).toEqual(403);
      });
    });

    describe("returnLeadersBoard", () => {
      test("it returns 403 if no users found", async () => {
        const res = await request(api).get("/scores/leadersboard");
        expect(res.statusCode).toEqual(403);
      });
    });

    // describe("destroy", () => {
    //   test("it returns 500 error in case of failure", async () => {
    //     const res = await request(api)
    //       .delete("/scores/username/jalexxx")
    //       .set("Accept", "application/json");
    //     expect(res.statusCode).toEqual(500);
    //   });
    // });
  });
});
