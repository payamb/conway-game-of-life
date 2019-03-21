export class Grid {
    constructor(gridSizeX, gridSizeY) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.grid = [];

        this.initialiseGrid();
    }
    initialiseGrid() {
        this.grid = new Array(this.gridSizeX).fill(0).map(
            () => new Array(this.gridSizeY).fill(0)
        );
    }
    getCell(x, y) {
        if (this.grid[x] !== undefined && this.grid[x][y] !== undefined) {
            return this.grid[x][y];
        }

        throw new Error(`cell does not exists: [x] ${x} [y] ${y}`);
    }
    setCell(x, y, value) {
        if (this.grid[x] !== undefined && this.grid[x][y] !== undefined) {
            this.grid[x][y] = + value;

            return ;
        }

        throw new Error('cell does not exists');
    }
    countNeighbours(x, y) {
        let startX = (x - 1 < 0) ? x : x - 1;
        let startY = (y - 1 < 0) ? y : y - 1;
        let endX = (x + 1 < this.gridSizeX) ? x + 1 : x;
        let endY = (y + 1 < this.gridSizeY) ? y + 1 : y;

        let neighbourCount = 0;
        for (let row = startX; row <= endX; row++) {
            for (let column = startY; column <= endY; column++) {
                if ((row !== x || column !== y) && this.getCell(row, column)) {
                    neighbourCount++;
                }
            }
        }

        return neighbourCount;
    }
    render() {
        for (let row = 0; row < this.gridSizeX; row++) {
            console.log(this.grid[row].join(' '));
        }
    }
}

export class GameOfLife {
    constructor(grid) {
        this.grid = grid;
    }
    addRandomLife(limit) {
        for (let i = 0; i < limit; i++) {
            let xPos = this.getRandomInt(this.grid.gridSizeX);
            let yPos = this.getRandomInt(this.grid.gridSizeY);

            while(this.grid.getCell(xPos, yPos)) {
                xPos = this.getRandomInt(this.grid.gridSizeX);
                yPos = this.getRandomInt(this.grid.gridSizeY);
            }

            this.grid.setCell(xPos, yPos,1);
        }
    }
    getNextState(x, y) {
        const aliveNeighbors = this.grid.countNeighbours(x, y);

        return aliveNeighbors === 3 || aliveNeighbors === 2 && this.grid.getCell(x, y);
    }
    runStep() {
        const nextGrid = new Grid(this.grid.gridSizeX, this.grid.gridSizeY);

        for (let row = 0; row < this.grid.gridSizeX; row++) {
            for (let column = 0; column < this.grid.gridSizeY; column++) {
                nextGrid.setCell(row, column, this.getNextState(row, column));
            }
        }

        return nextGrid;
    }
    start() {
        console.clear();
        let timerId = setInterval(() => {
            let nextGrid = this.runStep();
            this.grid = nextGrid;
            console.clear();
            console.log(this.grid.render());
        }, 500);
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}