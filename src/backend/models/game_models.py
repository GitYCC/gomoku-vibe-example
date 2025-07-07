from pydantic import BaseModel
from typing import List, Optional, Literal
from enum import Enum

class GameStatus(str, Enum):
    PLAYING = "playing"
    BLACK_WINS = "black_wins"
    WHITE_WINS = "white_wins"
    DRAW = "draw"

class Player(str, Enum):
    BLACK = "1"
    WHITE = "2"

class GameState(BaseModel):
    game_id: str
    board: List[List[int]]  # 15x15 board, 0: empty, 1: black, 2: white
    current_player: int  # 1: black, 2: white
    game_status: GameStatus
    winner: Optional[int] = None
    move_count: int = 0

class MoveRequest(BaseModel):
    row: int
    col: int

class MoveResponse(BaseModel):
    success: bool
    message: str
    game_state: GameState

class GameStartResponse(BaseModel):
    game_id: str
    game_state: GameState

class PlayerStats(BaseModel):
    name: str
    wins: int = 0
    losses: int = 0
    draws: int = 0
    total_games: int = 0
    win_rate: float = 0.0

class ScoreboardData(BaseModel):
    player1: PlayerStats
    player2: PlayerStats

class ScoreboardResponse(BaseModel):
    scoreboard: ScoreboardData