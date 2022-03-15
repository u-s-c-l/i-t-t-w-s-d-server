describe("successful endpoints", () => {
  let api;

  beforeAll(() => {
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
    test("it should return all users", async () => {
      const res = await request(api).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(5);
    });

    test("it should retrieve user based on username", async () => {
      const res = await request(api).get("/users/jalexxx");
      expect(res.statusCode).toEqual(200);
      expect(res.body.username).toEqual("jalexxx");
    });
  });

  describe("score", () => {
    test("it should return all users scores", async () => {
      const res = await request(api).get("/scores");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(5);
    });

    describe("destroy", () => {
      test("it destroys a users data", async () => {
        const res = await request(api)
          .delete("/scores/jalexxx")
          .set("Accept", "application/json");
        expect(res.statusCode).toEqual(204);
      });
    });
  });
});
