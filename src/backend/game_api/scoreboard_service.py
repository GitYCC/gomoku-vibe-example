from ..models.game_models import ScoreboardData, PlayerStats, GameStatus

class ScoreboardService:
    def __init__(self):
        self.scoreboard_data = ScoreboardData(
            player1=PlayerStats(name="黑子"),
            player2=PlayerStats(name="白子")
        )
    
    def get_scoreboard(self) -> ScoreboardData:
        """Get the current scoreboard data"""
        return self.scoreboard_data
    
    def update_score(self, game_status: GameStatus):
        """Update the scoreboard based on game result"""
        if game_status == GameStatus.BLACK_WINS:
            self.scoreboard_data.player1.wins += 1
            self.scoreboard_data.player2.losses += 1
        elif game_status == GameStatus.WHITE_WINS:
            self.scoreboard_data.player2.wins += 1
            self.scoreboard_data.player1.losses += 1
        elif game_status == GameStatus.DRAW:
            self.scoreboard_data.player1.draws += 1
            self.scoreboard_data.player2.draws += 1
        
        # Update total games and win rates
        self._update_stats()
    
    def _update_stats(self):
        """Update total games and win rates for both players"""
        for player in [self.scoreboard_data.player1, self.scoreboard_data.player2]:
            player.total_games = player.wins + player.losses + player.draws
            if player.total_games > 0:
                player.win_rate = round(player.wins / player.total_games * 100, 1)
            else:
                player.win_rate = 0.0
    
    def reset_scoreboard(self):
        """Reset the scoreboard to initial state"""
        self.scoreboard_data = ScoreboardData(
            player1=PlayerStats(name="黑子"),
            player2=PlayerStats(name="白子")
        )