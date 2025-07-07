class BoardManager:
    def __init__(self):
        self.size = 15
        self.board = [[0 for _ in range(self.size)] for _ in range(self.size)]
    
    def reset_board(self):
        """Reset the board to empty state"""
        self.board = [[0 for _ in range(self.size)] for _ in range(self.size)]
    
    def is_valid_position(self, row: int, col: int) -> bool:
        """Check if the position is valid and empty"""
        if not (0 <= row < self.size and 0 <= col < self.size):
            return False
        return self.board[row][col] == 0
    
    def place_piece(self, row: int, col: int, player: int) -> bool:
        """Place a piece on the board"""
        if not self.is_valid_position(row, col):
            return False
        self.board[row][col] = player
        return True
    
    def get_board_state(self) -> list:
        """Get the current board state"""
        return [row[:] for row in self.board]
    
    def is_board_full(self) -> bool:
        """Check if the board is full"""
        for row in self.board:
            if 0 in row:
                return False
        return True
    
    def get_piece_at(self, row: int, col: int) -> int:
        """Get the piece at the specified position"""
        if 0 <= row < self.size and 0 <= col < self.size:
            return self.board[row][col]
        return -1