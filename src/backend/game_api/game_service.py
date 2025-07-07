from typing import Optional
from ..game_engine.game_manager import GameManager
from ..models.game_models import GameState, MoveResponse, GameStartResponse, GameStatus

class GameService:
    def __init__(self):
        self.game_manager = GameManager()
        self.scoreboard_service = None  # Will be injected from controller
    
    def start_new_game(self) -> GameStartResponse:
        """Start a new game"""
        game_id = self.game_manager.create_game()
        game = self.game_manager.get_game(game_id)
        return GameStartResponse(
            game_id=game_id,
            game_state=game.get_game_state()
        )
    
    def get_game_state(self, game_id: str) -> Optional[GameState]:
        """Get the current game state"""
        game = self.game_manager.get_game(game_id)
        if not game:
            return None
        return game.get_game_state()
    
    def make_move(self, game_id: str, row: int, col: int) -> MoveResponse:
        """Make a move in the game"""
        game = self.game_manager.get_game(game_id)
        if not game:
            return MoveResponse(
                success=False,
                message="Game not found",
                game_state=None
            )
        
        # Store previous game status
        previous_status = game.game_status
        
        success = game.make_move(row, col)
        if success:
            # Check if game ended and update scoreboard
            current_state = game.get_game_state()
            if (previous_status == GameStatus.PLAYING and 
                current_state.game_status != GameStatus.PLAYING and
                self.scoreboard_service is not None):
                self.scoreboard_service.update_score(current_state.game_status)
            
            return MoveResponse(
                success=True,
                message="Move successful",
                game_state=current_state
            )
        else:
            return MoveResponse(
                success=False,
                message="Invalid move",
                game_state=game.get_game_state()
            )
    
    def reset_game(self, game_id: str) -> Optional[GameState]:
        """Reset the game"""
        game = self.game_manager.get_game(game_id)
        if not game:
            return None
        game.reset_game()
        return game.get_game_state()