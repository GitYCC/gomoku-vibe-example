from fastapi import APIRouter, HTTPException
from ..models.game_models import GameState, MoveRequest, MoveResponse, GameStartResponse
from .game_service import GameService

router = APIRouter(prefix="/api/game", tags=["game"])

# Global game service instance
game_service = GameService()

@router.post("/start", response_model=GameStartResponse)
async def start_game():
    """Start a new game"""
    try:
        return game_service.start_new_game()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{game_id}", response_model=GameState)
async def get_game_state(game_id: str):
    """Get the current game state"""
    game_state = game_service.get_game_state(game_id)
    if not game_state:
        raise HTTPException(status_code=404, detail="Game not found")
    return game_state

@router.post("/{game_id}/move", response_model=MoveResponse)
async def make_move(game_id: str, move: MoveRequest):
    """Make a move in the game"""
    try:
        return game_service.make_move(game_id, move.row, move.col)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{game_id}/reset", response_model=GameState)
async def reset_game(game_id: str):
    """Reset the game"""
    game_state = game_service.reset_game(game_id)
    if not game_state:
        raise HTTPException(status_code=404, detail="Game not found")
    return game_state