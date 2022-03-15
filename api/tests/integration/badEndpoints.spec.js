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
    test("it should return 403 error if no users found", async () => {
      const res = await request(api).get("/users");
      expect(res.statusCode).toEqual(403);
    });

    test("it should return 403 error if no user found", async () => {
      const res = await request(api).get("/users/jalexxx");
      expect(res.statusCode).toEqual(403);
    });
  });

  describe("score", () => {
    test("it should return 403 error if no users/scores found", async () => {
      const res = await request(api).get("/scores");
      expect(res.statusCode).toEqual(403);
    });

    test("it returns 500 error in case of failure", async () => {
      const res = await request(api)
        .delete("/scores/jalexxx")
        .set("Accept", "application/json");
      expect(res.statusCode).toEqual(500);
    });
  });
});
