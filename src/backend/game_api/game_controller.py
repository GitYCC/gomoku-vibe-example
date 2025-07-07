from fastapi import APIRouter, HTTPException
from ..models.game_models import GameState, MoveRequest, MoveResponse, GameStartResponse, ScoreboardResponse
from .game_service import GameService
from .scoreboard_service import ScoreboardService

router = APIRouter(prefix="/api/game", tags=["game"])

# Global service instances
game_service = GameService()
scoreboard_service = ScoreboardService()

# Inject scoreboard service into game service
game_service.scoreboard_service = scoreboard_service

@router.post("/start", response_model=GameStartResponse)
async def start_game():
    """Start a new game"""
    try:
        return game_service.start_new_game()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Scoreboard endpoints - moved before {game_id} routes to prevent route conflicts
@router.get("/scoreboard", response_model=ScoreboardResponse)
async def get_scoreboard():
    """Get the current scoreboard data"""
    try:
        scoreboard_data = scoreboard_service.get_scoreboard()
        return ScoreboardResponse(scoreboard=scoreboard_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/scoreboard/reset")
async def reset_scoreboard():
    """Reset the scoreboard"""
    try:
        scoreboard_service.reset_scoreboard()
        return {"message": "Scoreboard reset successfully"}
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