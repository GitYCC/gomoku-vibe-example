// Initialize the game components
document.addEventListener('DOMContentLoaded', () => {
    // Create instances of all components
    const apiClient = new ApiClient();
    const boardRenderer = new BoardRenderer('game-board');
    const gameStateManager = new GameStateManager(apiClient);
    const gameUI = new GameUI(gameStateManager);
    const inputHandler = new InputHandler(boardRenderer, gameStateManager);
    
    // Set up game state listener for board renderer
    gameStateManager.addListener((gameState) => {
        if (gameState && gameState.board) {
            boardRenderer.renderBoard(gameState.board);
        }
    });
    
    // Override boardRenderer's getPlayerAt method to use game state
    boardRenderer.getPlayerAt = (row, col) => {
        if (gameStateManager.gameState && gameStateManager.gameState.board) {
            return gameStateManager.gameState.board[row][col];
        }
        return 0;
    };
    
    // Add highlight for last move
    let lastMovePosition = null;
    gameStateManager.addListener((gameState) => {
        if (gameState && gameState.board) {
            // Find the last move by comparing with previous state
            // This is a simple implementation - in a real app you might want to track moves differently
            if (gameState.move_count > 0) {
                // For now, we'll skip the last move highlight
                // In a production app, you'd want to track the last move properly
            }
        }
    });
    
    console.log('Gomoku game initialized successfully!');
});