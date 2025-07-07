class GameStateManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.gameState = null;
        this.gameId = null;
        this.listeners = [];
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }

    notifyListeners() {
        this.listeners.forEach(listener => {
            if (typeof listener === 'function') {
                listener(this.gameState);
            }
        });
    }

    async startNewGame() {
        try {
            const response = await this.apiClient.startNewGame();
            this.gameId = response.game_id;
            this.gameState = response.game_state;
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Failed to start new game:', error);
            return false;
        }
    }

    async refreshGameState() {
        if (!this.gameId) return false;
        
        try {
            this.gameState = await this.apiClient.getGameState(this.gameId);
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Failed to refresh game state:', error);
            return false;
        }
    }

    async makeMove(row, col) {
        if (!this.gameId) return false;
        
        try {
            const response = await this.apiClient.makeMove(this.gameId, row, col);
            
            if (response.success) {
                this.gameState = response.game_state;
                this.notifyListeners();
                return true;
            } else {
                console.warn('Move failed:', response.message);
                return false;
            }
        } catch (error) {
            console.error('Failed to make move:', error);
            return false;
        }
    }

    async resetGame() {
        if (!this.gameId) return false;
        
        try {
            this.gameState = await this.apiClient.resetGame(this.gameId);
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Failed to reset game:', error);
            return false;
        }
    }

    getCurrentPlayer() {
        if (!this.gameState) return null;
        return this.gameState.current_player;
    }

    getGameStatus() {
        if (!this.gameState) return null;
        return this.gameState.game_status;
    }

    getWinner() {
        if (!this.gameState) return null;
        return this.gameState.winner;
    }

    getBoard() {
        if (!this.gameState) return null;
        return this.gameState.board;
    }

    getMoveCount() {
        if (!this.gameState) return 0;
        return this.gameState.move_count;
    }
}