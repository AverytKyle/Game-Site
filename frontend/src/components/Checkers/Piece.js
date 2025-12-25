class Piece {
    static idCounter = 0;

    constructor(position, color, boardElement) {
        this.position = position; // { row: int, col: int }
        this.color = color; // 'red' or 'black'
        this.isKing = false;
        this.element = null;
        this.id = Piece.idCounter++;
        this.squareSize = 100; // Size of each square on the board in pixels
        this.boardElement = boardElement;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    getColor() {
        return this.color;
    }

    makeKing() {
        this.isKing = true;
        this.element.classList.add('king');
    }

    move(newPosition) {
        this.position = newPosition;
        this.renderPosition();
    }

    render() {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('checkers-piece', this.color);
        pieceElement.style.position = 'absolute';
        pieceElement.setAttribute('id', `piece-${this.id}`);
        this.element = pieceElement;

        this.renderPosition();
        this.addDragHandlers();

        return pieceElement;
    }

    renderPosition() {
        this.element.style.left = `${this.position.col * this.squareSize + this.squareSize / 2}px`;
        this.element.style.top = `${this.position.row * this.squareSize + this.squareSize / 2}px`;

    }

    addDragHandlers() {
        this.element.addEventListener('pointerdown', (e) => {
            this.dragging = true;
            this.element.setPointerCapture(e.pointerId);

            const rect = this.element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            this.offsetX = e.clientX - centerX;
            this.offsetY = e.clientY - centerY;

            this.element.style.zIndex = 1000; // Bring to front
            this.element.style.cursor = 'grabbing';
        });

        this.element.addEventListener('pointermove', (e) => {
            if (!this.dragging) return;

            const boardRect = this.boardElement.getBoundingClientRect();

            this.element.style.left =
                `${e.clientX - boardRect.left - this.offsetX}px`;
            this.element.style.top =
                `${e.clientY - boardRect.top - this.offsetY}px`;
        });

        this.element.addEventListener('pointerup', (e) => {
            this.dragging = false;
            this.element.style.cursor = 'grab';

            // Snap to nearest square
            const col = Math.round(
                this.element.offsetLeft / this.squareSize
            );
            const row = Math.round(
                this.element.offsetTop / this.squareSize
            );

            this.move({ row, col });
        });
    }
}

export default Piece;