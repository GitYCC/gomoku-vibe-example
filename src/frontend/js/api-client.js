class ApiClient {
    constructor() {
        this.baseURL = '/api/game';
    }

    async startNewGame() {
        try {
            const response = await fetch(`${this.baseURL}/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error starting new game:', error);
            throw error;
        }
    }

    async getGameState(gameId) {
        try {
            const response = await fetch(`${this.baseURL}/${gameId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error getting game state:', error);
            throw error;
        }
    }

    async makeMove(gameId, row, col) {
        try {
            const response = await fetch(`${this.baseURL}/${gameId}/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    row: row,
                    col: col
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error making move:', error);
            throw error;
        }
    }

    async resetGame(gameId) {
        try {
            const response = await fetch(`${this.baseURL}/${gameId}/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error resetting game:', error);
            throw error;
        }
    }

    async getScoreboard() {
        try {
            const response = await fetch(`${this.baseURL}/scoreboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error getting scoreboard:', error);
            throw error;
        }
    }

    async resetScoreboard() {
        try {
            const response = await fetch(`${this.baseURL}/scoreboard/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error resetting scoreboard:', error);
            throw error;
        }
    }
}