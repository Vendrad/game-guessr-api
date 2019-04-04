// import GamesController from '../src/controllers/games.controller';

// test('Decade id 0 is the 80\'s', () => {
//   const req = {params: { decade: 0 }};
//   expect(GamesController.getYearRange(req)).toBe([1980, 1989]);
// });

import { expect } from "chai";
import GamesController from '../src/controllers/games.controller';

describe("GamesController", () => {
    describe("getYearRange", () => {
        it("Should return [1980, 1989] when decade id is 0", () => {

            const req = {
                params: {
                    decade: '0'
                }
            };

            console.log("dane - " + typeof [1980, 1989]);
            expect(GamesController.getYearRange(req)).to.equal([1980, 1989]);
        })
    })
})