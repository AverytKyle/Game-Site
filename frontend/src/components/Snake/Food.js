class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    checkEaten(snakeHead) {
        return this.x === snakeHead.x && this.y === snakeHead.y;
    }

    setPosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, 15, 15);
    }
}

export default Food;