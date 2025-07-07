from typing import Optional
from ..game_engine.game_manager import GameManager
from ..models.game_models import GameState, MoveResponse, GameStartResponse

class GameService:
    def __init__(self):
        self.game_manager = GameManager()
    
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
        
        success = game.make_move(row, col)
        if success:
            return MoveResponse(
                success=True,
                message="Move successful",
                game_state=game.get_game_state()
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