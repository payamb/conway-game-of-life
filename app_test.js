import { assert } from 'chai';
import { GameOfLife } from './app';

describe('Game of Life', function() {
    describe('Has initialised default values', function() {
        it('Grid width and height specified', function() {
            const game = new GameOfLife();

            assert.exists(game.gridSizeX, 'GridSizeX has been defined');
            assert.exists(game.gridSizeY, 'GridSizeY has been defined');
        });
        it('Grid matrix initialised', function () {
            const game = new GameOfLife();
            const expectedSize = game.gridSizeX * game.gridSizeY;
            const actualSize = game.grid.reduce((sum, r) => sum + r.length, 0);

            assert.exists(game.grid, 'Grid has been defined');
            assert.equal(expectedSize, actualSize,  'Grid matrix has filled with empty values');
        });
        it('random life initialised', function () {
            const game = new GameOfLife();
            const actualSize = game.grid.reduce((sum, r) => sum + r.reduce((sum, c) => sum + c), 0);

            assert.isAtLeast(actualSize, game.startingLifeCells, 'Grid has enough life cell initialised');
        });
    });
    describe('Is calculating game state', function () {
        it('Looking in to neighbour cells', function () {

        })
    })
});
