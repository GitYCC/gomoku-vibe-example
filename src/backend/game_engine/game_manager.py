import uuid
from typing import Dict, Optional
from .board_manager import BoardManager
from .win_checker import WinChecker
from .game_rules import GameRules
from ..models.game_models import GameState, GameStatus

class GameManager:
    def __init__(self):
        self.games: Dict[str, 'Game'] = {}
    
    def create_game(self) -> str:
        """Create a new game and return game ID"""
        game_id = str(uuid.uuid4())
        self.games[game_id] = Game(game_id)
        return game_id
    
    def get_game(self, game_id: str) -> Optional['Game']:
        """Get a game by ID"""
        return self.games.get(game_id)
    
    def delete_game(self, game_id: str) -> bool:
        """Delete a game"""
        if game_id in self.games:
            del self.games[game_id]
            return True
        return False

class Game:
    def __init__(self, game_id: str):
        self.game_id = game_id
        self.board_manager = BoardManager()
        self.win_checker = WinChecker(self.board_manager)
        self.current_player = GameRules.get_starting_player()
        self.game_status = GameStatus.PLAYING
        self.winner = None
        self.move_count = 0
    
    def make_move(self, row: int, col: int) -> bool:
        """Make a move and return if successful"""
        if self.game_status != GameStatus.PLAYING:
            return False
        
        if not GameRules.is_valid_move(self.board_manager, row, col):
            return False
        
        # Place the piece
        if not self.board_manager.place_piece(row, col, self.current_player):
            return False
        
        self.move_count += 1
        
        # Check for win
        if self.win_checker.check_win(row, col, self.current_player):
            self.winner = self.current_player
            self.game_status = GameStatus.BLACK_WINS if self.current_player == 1 else GameStatus.WHITE_WINS
        elif self.board_manager.is_board_full():
            self.game_status = GameStatus.DRAW
        else:
            # Switch player
            self.current_player = GameRules.get_next_player(self.current_player)
        
        return True
    
    def get_game_state(self) -> GameState:
        """Get the current game state"""
        return GameState(
            game_id=self.game_id,
            board=self.board_manager.get_board_state(),
            current_player=self.current_player,
            game_status=self.game_status,
            winner=self.winner,
            move_count=self.move_count
        )
    
    def reset_game(self):
        """Reset the game to initial state"""
        self.board_manager.reset_board()
        self.current_player = GameRules.get_starting_player()
        self.game_status = GameStatus.PLAYING
        self.winner = None
        self.move_count = 0