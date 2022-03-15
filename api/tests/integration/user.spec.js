describe("users endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(() => {
    api = app.listen(5000, () =>
      console.log("Test server running on prot 5000...")
    );
  });

  afterAll(async () => {
    console.log("Stopping test server");
    await api.close();
  });

  test("it should retrieve user based on username", () => {
    const res = await request(api).get("users/jalexxx");
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual("jalexxx");
  });
});
