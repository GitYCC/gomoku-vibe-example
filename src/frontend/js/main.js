// Initialize the game components
document.addEventListener('DOMContentLoaded', () => {
    // Create instances of all components
    const apiClient = new ApiClient();
    const boardRenderer = new BoardRenderer('game-board');
    const gameStateManager = new GameStateManager(apiClient);
    const scoreboardUI = new ScoreboardUI();
    const gameUI = new GameUI(gameStateManager);
    const inputHandler = new InputHandler(boardRenderer, gameStateManager);
    
    // Set up scoreboard
    scoreboardUI.setApiClient(apiClient);
    const scoreboardContainer = document.getElementById('scoreboard-container');
    scoreboardContainer.appendChild(scoreboardUI.getElement());
    
    // Load initial scoreboard data
    scoreboardUI.loadScoreboard();
    
    // Set up game state listener for board renderer and scoreboard
    gameStateManager.addListener((gameState) => {
        if (gameState && gameState.board) {
            boardRenderer.renderBoard(gameState.board);
            
            // Update scoreboard when game ends
            if (gameState.game_status !== 'playing') {
                setTimeout(() => {
                    scoreboardUI.loadScoreboard();
                }, 100); // Small delay to ensure backend has processed the score update
            }
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