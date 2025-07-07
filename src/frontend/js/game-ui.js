class GameUI {
    constructor(gameStateManager) {
        this.gameStateManager = gameStateManager;
        this.currentPlayerText = document.getElementById('current-player-text');
        this.gameStatusText = document.getElementById('game-status-text');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.resetGameBtn = document.getElementById('reset-game-btn');
        
        this.setupEventListeners();
        this.gameStateManager.addListener(this.onGameStateChange.bind(this));
    }

    setupEventListeners() {
        this.newGameBtn.addEventListener('click', () => {
            this.startNewGame();
        });
        
        this.resetGameBtn.addEventListener('click', () => {
            this.resetGame();
        });
    }

    async startNewGame() {
        this.newGameBtn.disabled = true;
        this.newGameBtn.textContent = '創建中...';
        
        const success = await this.gameStateManager.startNewGame();
        
        this.newGameBtn.disabled = false;
        this.newGameBtn.textContent = '新遊戲';
        
        if (success) {
            this.resetGameBtn.disabled = false;
        }
    }

    async resetGame() {
        this.resetGameBtn.disabled = true;
        this.resetGameBtn.textContent = '重置中...';
        
        const success = await this.gameStateManager.resetGame();
        
        this.resetGameBtn.disabled = false;
        this.resetGameBtn.textContent = '重新開始';
    }

    onGameStateChange(gameState) {
        if (!gameState) return;
        
        this.updateCurrentPlayer(gameState.current_player);
        this.updateGameStatus(gameState.game_status, gameState.winner);
    }

    updateCurrentPlayer(currentPlayer) {
        const playerText = currentPlayer === 1 ? '黑子' : '白子';
        this.currentPlayerText.textContent = `當前玩家: ${playerText}`;
    }

    updateGameStatus(gameStatus, winner) {
        let statusText = '';
        
        switch (gameStatus) {
            case 'playing':
                statusText = '遊戲進行中';
                break;
            case 'black_wins':
                statusText = '黑子獲勝！';
                break;
            case 'white_wins':
                statusText = '白子獲勝！';
                break;
            case 'draw':
                statusText = '平局！';
                break;
            default:
                statusText = '未知狀態';
        }
        
        this.gameStatusText.textContent = statusText;
        
        // Update UI based on game status
        if (gameStatus !== 'playing') {
            this.gameStatusText.style.fontWeight = 'bold';
            this.gameStatusText.style.color = '#FF6B6B';
        } else {
            this.gameStatusText.style.fontWeight = 'normal';
            this.gameStatusText.style.color = '#333';
        }
    }
}