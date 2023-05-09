import { PieceType, Team } from "../components/ChessBoard";

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: Team
  ) {
    console.log("Referee has eyes on you!");
    console.log(
      `You moved the ${team} ${type} piece from (${px},${py}) to (${x},${y})`
    );

    if (type === PieceType.PAWN) {
      if (team === Team.WHITE) {
        if (py === 1) {
          if ((y === py + 2 || y === py + 1) && x === px) return true;
        } else if (x === px) {
          if (y === py + 1) return true;
        }
      }
      if (team === Team.BLACK) {
        if (py === 6) {
          if ((y === py - 2 || y === py - 1) && x === px) return true;
        } else if (x === px) {
          if (y === py - 1) return true;
        }
      }
    }

    return false;
  }
}
