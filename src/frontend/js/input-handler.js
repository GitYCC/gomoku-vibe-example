class InputHandler {
    constructor(boardRenderer, gameStateManager) {
        this.boardRenderer = boardRenderer;
        this.gameStateManager = gameStateManager;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.boardRenderer.canvas.addEventListener('click', (event) => {
            this.handleBoardClick(event);
        });
        
        this.boardRenderer.canvas.addEventListener('mousemove', (event) => {
            this.handleMouseMove(event);
        });
        
        this.boardRenderer.canvas.style.cursor = 'pointer';
    }

    handleBoardClick(event) {
        const position = this.boardRenderer.getClickPosition(event);
        if (!position) return;
        
        const { row, col } = position;
        
        // Check if the game is still playing
        if (this.gameStateManager.gameState.game_status !== 'playing') {
            return;
        }
        
        // Check if the position is empty
        if (this.gameStateManager.gameState.board[row][col] !== 0) {
            return;
        }
        
        // Make the move
        this.gameStateManager.makeMove(row, col);
    }

    handleMouseMove(event) {
        const position = this.boardRenderer.getClickPosition(event);
        if (!position) {
            this.boardRenderer.canvas.style.cursor = 'default';
            return;
        }
        
        const { row, col } = position;
        
        // Change cursor based on whether the position is valid
        if (this.gameStateManager.gameState.game_status === 'playing' && 
            this.gameStateManager.gameState.board[row][col] === 0) {
            this.boardRenderer.canvas.style.cursor = 'pointer';
        } else {
            this.boardRenderer.canvas.style.cursor = 'not-allowed';
        }
    }
}