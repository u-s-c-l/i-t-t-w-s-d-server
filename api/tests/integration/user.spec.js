describe("users endpoints", () => {
  let api;
  beforeEach(async () => {
    const res = await resetTestDB();
    console.log(res);
  });

  beforeAll(() => {
    api = app.listen(port, () =>
      console.log("Test server running on port 5000...")
    );
  });

  afterAll(async () => {
    console.log("Stopping test server");
    await api.close();
  });

  test("it should retrieve user based on username", async () => {
    const res = await request(api).get("/users/jalexxx");
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual("jalexxx");
  });
});
