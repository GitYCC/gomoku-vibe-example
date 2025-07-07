class WinChecker:
    def __init__(self, board_manager):
        self.board_manager = board_manager
        self.directions = [
            (0, 1),   # horizontal
            (1, 0),   # vertical
            (1, 1),   # diagonal \
            (1, -1)   # diagonal /
        ]
    
    def check_win(self, row: int, col: int, player: int) -> bool:
        """Check if the player wins with the last move at (row, col)"""
        for dr, dc in self.directions:
            if self._count_consecutive(row, col, dr, dc, player) >= 5:
                return True
        return False
    
    def _count_consecutive(self, row: int, col: int, dr: int, dc: int, player: int) -> int:
        """Count consecutive pieces in a direction"""
        count = 1  # Count the current piece
        
        # Count in positive direction
        r, c = row + dr, col + dc
        while (0 <= r < self.board_manager.size and 
               0 <= c < self.board_manager.size and 
               self.board_manager.get_piece_at(r, c) == player):
            count += 1
            r += dr
            c += dc
        
        # Count in negative direction
        r, c = row - dr, col - dc
        while (0 <= r < self.board_manager.size and 
               0 <= c < self.board_manager.size and 
               self.board_manager.get_piece_at(r, c) == player):
            count += 1
            r -= dr
            c -= dc
        
        return count
    
    def get_winner(self) -> int:
        """Check if there's a winner on the board"""
        for row in range(self.board_manager.size):
            for col in range(self.board_manager.size):
                piece = self.board_manager.get_piece_at(row, col)
                if piece != 0:
                    if self.check_win(row, col, piece):
                        return piece
        return 0