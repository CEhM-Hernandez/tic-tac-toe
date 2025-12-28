import type { Cell, Winner } from '@/types/game'
import JSConfetti from 'js-confetti'

export const confetti = new JSConfetti()

export const INITIAL_BOARD: Cell[] = Array(9).fill(null)

export const ERROR_CELL_TIMEOUT = 700

export function checkWinner(board: Cell[]): Winner {
  const size = 3
  const center = board[4]

  for (let i = 0; i < size; i++) {
    // Verificar fila i
    if (
      board[i * size] &&
      board[i * size] === board[i * size + 1] &&
      board[i * size] === board[i * size + 2]
    ) {
      return board[i * size]
    }

    // Verificar columna i
    if (board[i] && board[i] === board[i + size] && board[i] === board[i + size * 2]) {
      return board[i]
    }
  }

  // Verificar diagonales
  if (center) {
    if (board[0] === center && center === board[8]) return center
    if (board[2] === center && center === board[6]) return center
  }

  return board.every((cell) => cell !== null) ? 'Draw' : null
}

export function getNextPlayer(current: 'X' | 'O'): 'X' | 'O' {
  return current === 'X' ? 'O' : 'X'
}
