export class GameOfLife {
    constructor() {
        this.gridSizeX = 50;
        this.gridSizeY = 50;
        this.startingLifeCells = 40;
        this.grid = [];

        this.initialiseGrid();
        this.initialRandomLife();
    }
    initialiseGrid() {
        this.grid = new Array(this.gridSizeX).fill(0).map(
            () => new Array(this.gridSizeY).fill(0)
        );
    }
    initialRandomLife() {
        for (let i = 0; i <= this.startingLifeCells; i++) {
            let xPos = this.getRandomInt(this.gridSizeX);
            let yPos = this.getRandomInt(this.gridSizeY);

            while(this.grid[xPos][yPos]) {
                xPos = this.getRandomInt(this.gridSizeX);
                yPos = this.getRandomInt(this.gridSizeY);
            }

            this.grid[xPos][yPos] = 1;
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}