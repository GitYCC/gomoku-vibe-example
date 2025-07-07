class BoardRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.boardSize = 15;
        this.cellSize = 40;
        this.padding = 30;
        this.lastMove = null;
        
        this.setupCanvas();
    }

    setupCanvas() {
        const totalSize = this.boardSize * this.cellSize + 2 * this.padding;
        this.canvas.width = totalSize;
        this.canvas.height = totalSize;
        this.drawBoard();
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.ctx.fillStyle = '#DEB887';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.boardSize; i++) {
            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.padding, this.padding + i * this.cellSize);
            this.ctx.lineTo(this.canvas.width - this.padding, this.padding + i * this.cellSize);
            this.ctx.stroke();
            
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.padding + i * this.cellSize, this.padding);
            this.ctx.lineTo(this.padding + i * this.cellSize, this.canvas.height - this.padding);
            this.ctx.stroke();
        }
        
        // Draw star points
        this.drawStarPoints();
    }

    drawStarPoints() {
        const starPoints = [
            [3, 3], [3, 11], [7, 7], [11, 3], [11, 11]
        ];
        
        this.ctx.fillStyle = '#000';
        starPoints.forEach(([row, col]) => {
            const x = this.padding + col * this.cellSize;
            const y = this.padding + row * this.cellSize;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
            this.ctx.fill();
        });
    }

    drawPiece(row, col, player) {
        const x = this.padding + col * this.cellSize;
        const y = this.padding + row * this.cellSize;
        const radius = this.cellSize * 0.4;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        
        if (player === 1) {
            // Black piece
            this.ctx.fillStyle = '#000';
        } else {
            // White piece
            this.ctx.fillStyle = '#fff';
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 2;
        }
        
        this.ctx.fill();
        
        if (player === 2) {
            this.ctx.stroke();
        }
    }

    highlightLastMove(row, col) {
        if (this.lastMove) {
            // Clear previous highlight
            this.redrawPiece(this.lastMove.row, this.lastMove.col, this.lastMove.player);
        }
        
        // Draw highlight
        const x = this.padding + col * this.cellSize;
        const y = this.padding + row * this.cellSize;
        
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.cellSize * 0.45, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        this.lastMove = { row, col, player: this.getPlayerAt(row, col) };
    }

    redrawPiece(row, col, player) {
        const x = this.padding + col * this.cellSize;
        const y = this.padding + row * this.cellSize;
        const radius = this.cellSize * 0.5;
        
        // Clear the area
        this.ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
        
        // Redraw board lines in that area
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        
        // Horizontal line
        this.ctx.beginPath();
        this.ctx.moveTo(x - radius, y);
        this.ctx.lineTo(x + radius, y);
        this.ctx.stroke();
        
        // Vertical line
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.stroke();
        
        // Redraw piece
        if (player > 0) {
            this.drawPiece(row, col, player);
        }
    }

    renderBoard(boardState) {
        this.drawBoard();
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const piece = boardState[row][col];
                if (piece !== 0) {
                    this.drawPiece(row, col, piece);
                }
            }
        }
    }

    getClickPosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const col = Math.round((x - this.padding) / this.cellSize);
        const row = Math.round((y - this.padding) / this.cellSize);
        
        if (row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize) {
            return { row, col };
        }
        
        return null;
    }

    getPlayerAt(row, col) {
        // This should be set by the game state manager
        return 0;
    }
}