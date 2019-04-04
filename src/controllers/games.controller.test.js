import GamesController from "./games.controller";

describe("GamesController.getYearRange", () => {
    it("Should return [1980, 1989] when decade id is 0", () => {

      const req = { params: { decade: '0' } };

      expect(GamesController.getYearRange(req)).toEqual([1980, 1989]);
    });
});
