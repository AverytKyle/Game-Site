export default class Snake {
    constructor(initSegments, initDirection, segmentSize) {
        this.segments = initSegments;
        this.direction = initDirection;
        this.segmentSize = segmentSize;
    }

    move() {
        const head = { ...this.segments[0] };

        switch (this.direction) {
            case 'UP':
                head.y -= this.segmentSize;
                break;
            case 'DOWN':
                head.y += this.segmentSize;
                break;
            case 'LEFT':
                head.x -= this.segmentSize;
                break;
            case 'RIGHT':
                head.x += this.segmentSize;
                break;
            default:
                break;
        }

        this.segments.pop(); // Remove the tail
        this.segments.unshift(head); // Add new head
    }

    grow() {
        const tail = this.segments[this.segments.length - 1];
        this.segments.push({ x: tail.x, y: tail.y });
    }

    checkCollision(boardWidth, boardHeight) {
        const head = this.segments[0];

        if (head.x < 0 || head.x === boardWidth || head.y < 0 || head.y === boardHeight) {
            return true; // Collision with walls
        }

        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
                return true; // Collision with itself
            }
        }

        return false;
    }

    draw(context) {
        context.fillStyle = 'green';
        this.segments.forEach(segment => {
            context.fillRect(segment.x, segment.y, this.segmentSize, this.segmentSize);
        });
    }
}