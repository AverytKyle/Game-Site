class Piece {
    constructor(position, color) {
        this.position = position; // { row: int, col: int }
        this.color = color; // 'red' or 'black'
        this.isKing = false;
        this.element = null;
    }

    makeKing() {
        this.isKing = true;
    }

    move(newPosition) {
        this.position = newPosition;
    }

    render() {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('checkers-piece', this.color);
        this.element = pieceElement;
        return pieceElement;
    }
}

export default Piece;