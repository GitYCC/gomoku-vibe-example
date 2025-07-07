from ..models.game_models import GameStatus, Player

class GameRules:
    @staticmethod
    def is_valid_move(board_manager, row: int, col: int) -> bool:
        """Check if the move is valid according to game rules"""
        return board_manager.is_valid_position(row, col)
    
    @staticmethod
    def get_next_player(current_player: int) -> int:
        """Get the next player in turn"""
        return 2 if current_player == 1 else 1
    
    @staticmethod
    def determine_game_status(board_manager, win_checker, winner: int) -> GameStatus:
        """Determine the current game status"""
        if winner == 1:
            return GameStatus.BLACK_WINS
        elif winner == 2:
            return GameStatus.WHITE_WINS
        elif board_manager.is_board_full():
            return GameStatus.DRAW
        else:
            return GameStatus.PLAYING
    
    @staticmethod
    def get_starting_player() -> int:
        """Get the starting player (black always starts)"""
        return 1