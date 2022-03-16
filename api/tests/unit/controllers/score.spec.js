require("dotenv").config();

const scoreController = require("../../../controllers/score");
const Score = require("../../../models/Score");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

describe("score controller", () => {
  describe("destroy", () => {
    test("it throws 500 in case of error", async () => {
      jest.spyOn(Score, "destroy").mockImplementation(() => {
        throw new Error();
      });
      const mockReq = { params: { username: "tester" } };
      await scoreController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });
});
