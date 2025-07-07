class ScoreboardUI {
    constructor() {
        this.scoreboardElement = null;
        this.apiClient = null;
        this.init();
    }

    init() {
        this.createScoreboardElement();
        this.setupEventListeners();
    }

    setApiClient(apiClient) {
        this.apiClient = apiClient;
    }

    createScoreboardElement() {
        this.scoreboardElement = document.createElement('div');
        this.scoreboardElement.id = 'scoreboard';
        this.scoreboardElement.className = 'scoreboard-container';
        
        this.scoreboardElement.innerHTML = `
            <div class="scoreboard-header">
                <h2>記分板</h2>
                <button id="reset-scoreboard" class="reset-btn">重置記分板</button>
            </div>
            <div class="scoreboard-content">
                <div class="player-stats" id="player1-stats">
                    <div class="player-info">
                        <h3>黑子 (先手)</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">勝利</span>
                                <span class="stat-value" id="player1-wins">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">失敗</span>
                                <span class="stat-value" id="player1-losses">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">平手</span>
                                <span class="stat-value" id="player1-draws">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">總局數</span>
                                <span class="stat-value" id="player1-total">0</span>
                            </div>
                            <div class="stat-item win-rate">
                                <span class="stat-label">勝率</span>
                                <span class="stat-value" id="player1-winrate">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vs-divider">VS</div>
                <div class="player-stats" id="player2-stats">
                    <div class="player-info">
                        <h3>白子 (後手)</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">勝利</span>
                                <span class="stat-value" id="player2-wins">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">失敗</span>
                                <span class="stat-value" id="player2-losses">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">平手</span>
                                <span class="stat-value" id="player2-draws">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">總局數</span>
                                <span class="stat-value" id="player2-total">0</span>
                            </div>
                            <div class="stat-item win-rate">
                                <span class="stat-label">勝率</span>
                                <span class="stat-value" id="player2-winrate">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const resetBtn = this.scoreboardElement.querySelector('#reset-scoreboard');
        resetBtn.addEventListener('click', () => this.resetScoreboard());
    }

    updateScoreboard(scoreboardData) {
        const player1 = scoreboardData.player1;
        const player2 = scoreboardData.player2;

        // Update player 1 stats
        document.getElementById('player1-wins').textContent = player1.wins;
        document.getElementById('player1-losses').textContent = player1.losses;
        document.getElementById('player1-draws').textContent = player1.draws;
        document.getElementById('player1-total').textContent = player1.total_games;
        document.getElementById('player1-winrate').textContent = player1.win_rate + '%';

        // Update player 2 stats
        document.getElementById('player2-wins').textContent = player2.wins;
        document.getElementById('player2-losses').textContent = player2.losses;
        document.getElementById('player2-draws').textContent = player2.draws;
        document.getElementById('player2-total').textContent = player2.total_games;
        document.getElementById('player2-winrate').textContent = player2.win_rate + '%';
    }

    async loadScoreboard() {
        if (!this.apiClient) {
            console.error('API client not set');
            return;
        }

        try {
            const response = await this.apiClient.getScoreboard();
            if (response.scoreboard) {
                this.updateScoreboard(response.scoreboard);
            }
        } catch (error) {
            console.error('Error loading scoreboard:', error);
        }
    }

    async resetScoreboard() {
        if (!this.apiClient) {
            console.error('API client not set');
            return;
        }

        try {
            await this.apiClient.resetScoreboard();
            await this.loadScoreboard(); // Reload after reset
        } catch (error) {
            console.error('Error resetting scoreboard:', error);
        }
    }

    getElement() {
        return this.scoreboardElement;
    }
}