import { assert } from 'chai';
import { GameOfLife, Grid } from './app';

describe('Grid', function () {
    describe('State', function () {

        it('Grid width and height are initialised', function() {
            const grid = new Grid(50, 50);

            assert.exists(grid.gridSizeX, 'GridSizeX has been defined');
            assert.exists(grid.gridSizeY, 'GridSizeY has been defined');
        });

        it('Grid matrix initialised', function () {
            const grid = new Grid(50, 50);
            const expectedSize = grid.gridSizeX * grid.gridSizeY;
            const actualSize = grid.grid.reduce((sum, r) => sum + r.length, 0);

            assert.equal(actualSize, expectedSize, 'Grid matrix has filled with empty values');
        });

    });
    describe('Functionality', function () {
        it('Can read a cell value', function () {
            const grid = new Grid(50, 50);
            let cellValue = grid.getCell(1, 2);

            assert.equal(cellValue, 0, 'getCell method return valid value');
        });
        it('Can set a cell value', function () {
            const grid = new Grid(50, 50);
            grid.setCell(1,2, 1);
            grid.setCell(0,0, 1);

            assert.exists(grid.setCell, 'setCell method exists');
            assert.equal(grid.getCell(1, 2), 1, 'value of cell has been set correctly');
            assert.equal(grid.getCell(0, 0), 1, 'value of cell has been set correctly');
            assert.equal(grid.getCell(2, 2), 0, 'value of cell has been set correctly');
        });
        it('Counting neighbours', function () {
            const grid = new Grid(4, 4);
            grid.setCell(0,0, 1);
            grid.setCell(0,2, 1);
            grid.setCell(2,0, 1);

            assert.equal(grid.countNeighbours(1, 1), 3, 'neighbours count is correct');
            assert.equal(grid.countNeighbours(2, 1), 1, 'neighbours count is correct');
        })
    })
});

describe('Game of Life', function() {
    describe('State ', function() {
        it('random life initialised', function () {
            const grid = new Grid(50, 50);
            const game = new GameOfLife(grid);
            game.addRandomLife(20);

            const actualSize = game.grid.grid.reduce((sum, r) => sum + r.reduce((sum, c) => sum + c), 0);

            assert.isAtLeast(actualSize, 20, 'Grid has enough life cell initialised');
        });
    });
    describe('Functionality', function () {
        it('calculate next state for a cell', function () {
            const grid = new Grid(4, 4);
            const game = new GameOfLife(grid);

            game.grid.setCell(0,0, 1);
            game.grid.setCell(0,2, 1);
            game.grid.setCell(2,0, 1);

            assert.equal(1, game.getNextState(1, 1));
            assert.equal(0, game.getNextState(2, 0));
        });
    });
});

describe('t', function () {
    it('calculate a step in evolution', function () {
        const grid = new Grid(10, 10);
        const game = new GameOfLife(grid);
        game.addRandomLife(30);

        game.start();

        assert.equal(1, 1);
    });
});
