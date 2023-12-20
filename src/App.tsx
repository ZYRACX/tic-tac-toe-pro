// import React, { useState } from 'react';
// import { Button, Container, Grid, Typography } from '@mui/material';

// type Player = 'X' | 'O' | null;

// const App: React.FC = () => {
//   const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));
//   const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
//   const [winner, setWinner] = useState<Player | null>(null);

//   const handleClick = (index: number) => {
//     if (board[index] || winner) return; // If the cell is already filled or there's a winner, do nothing

//     const newBoard = board.slice();
//     newBoard[index] = currentPlayer;
//     setBoard(newBoard);

//     checkWinner(newBoard, index);
//     setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
//   };

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const checkWinner = (currentBoard: Array<Player | null>, index: number) => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (const line of lines) {
//       const [a, b, c] = line;
//       if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
//         setWinner(currentPlayer);
//         return;
//       }
//     }

//     if (currentBoard.every((cell) => cell !== null)) {
//       // If all cells are filled and no winner, it's a draw
//       setWinner(null);
//     }
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill(null));
//     setCurrentPlayer('X');
//     setWinner(null);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Tic-Tac-Toe
//       </Typography>
//       <Grid container justifyContent="center" spacing={1}>
//   {[0, 1, 2].map((row) => (
//     <Grid container item key={row} justifyContent="center" spacing={1}>
//       {[0, 1, 2].map((col) => (
//         <Grid item key={col}>
//           <Button
//             variant="outlined"
//             style={{ width: '50px', height: '50px' }}
//             onClick={() => handleClick(row * 3 + col)}
//             disabled={board[row * 3 + col] !== null || winner !== null}
//           >
//             {board[row * 3 + col]}
//           </Button>
//         </Grid>
//       ))}
//     </Grid>
//   ))}
// </Grid>

//       <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
//         {winner ? `Winner: ${winner}` : winner === null ? 'Draw!' : `Current Player: ${currentPlayer}`}
//       </Typography>
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Button variant="contained" color="primary" onClick={resetGame}>
//           Reset Game
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default App;





import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
// import { Socket } from 'socket.io-client';

type Player = 'X' | 'O' | null;

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const App: React.FC = () => {
  const size = 5; // Set the size of the Tic-Tac-Toe grid
  const [board, setBoard] = useState<Array<Player | null>>(Array(size * size).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return; // If the cell is already filled or there's a winner, do nothing

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    checkWinner(newBoard, index);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkWinner = (currentBoard: Array<Player | null>, index: number) => {
    const lines: number[][] = [];
    for (let i = 0; i < size; i++) {
      // Check rows
      lines.push(Array.from({ length: size }, (_, col) => i * size + col));
      // Check columns
      lines.push(Array.from({ length: size }, (_, row) => row * size + i));
    }

    // Check diagonals
    lines.push(Array.from({ length: size }, (_, i) => i * size + i));
    lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)));

    let draw = true;
    const triplateCounts = {
      'X': 0,
      'O': 0,
    };

    for (const line of lines) {
      const [a, b, c, d, e] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c] &&
        currentBoard[a] === currentBoard[d] &&
        currentBoard[a] === currentBoard[e]
      ) {
        setWinner(currentPlayer);
        return;
      }

      if (
        draw &&
        currentBoard[a] === null &&
        currentBoard[b] === null &&
        currentBoard[c] === null &&
        currentBoard[d] === null &&
        currentBoard[e] === null
      ) {
        draw = false;
      }
      // Check for non-null values before accessing currentBoard[a]
      if (currentBoard[a] !== null && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        triplateCounts[currentBoard[a]]++;
      }
    }

    if (draw) {
     // If all cells are filled and no winner, count the X's and O's
    const xCount = currentBoard.filter((cell) => cell === 'X').length;
    const oCount = currentBoard.filter((cell) => cell === 'O').length;

    console.log(xCount)
    console.log(oCount)
    if (xCount > oCount) {
      setWinner('X');
    } else if (oCount > xCount) {
      setWinner('O');
    } else {
      // Determine the winner based on triplate counts in case of a draw
      if (triplateCounts['X'] > triplateCounts['O']) {
        setWinner('X');
      } else if (triplateCounts['O'] > triplateCounts['X']) {
        setWinner('O');
      } else {
        setWinner(null); // It's a draw, and triplate counts are equal
      }
    }
    }
  };

  const resetGame = () => {
    setBoard(Array(size * size).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Tic-Tac-Toe 5x5
      </Typography>
      <Grid container justifyContent="center" spacing={1}>
        {[...Array(size)].map((_, row) => (
          <Grid container item key={row} justifyContent="center" spacing={1}>
            {[...Array(size)].map((_, col) => (
              <Grid item key={col}>
                <Button
                  variant="outlined"
                  style={{ width: '50px', height: '50px' }}
                  onClick={() => handleClick(row * size + col)}
                  disabled={board[row * size + col] !== null || winner !== null}
                >
                  {board[row * size + col]}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
        {winner ? `Winner: ${winner}` : winner === null ? 'Draw!' : `Current Player: ${currentPlayer}`}
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={resetGame}>
          Reset Game
        </Button>
      </div>
    </Container>
  );
};

export default App;
