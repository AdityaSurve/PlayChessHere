import { useRef, useState } from "react";
import Tile from "./Tile";
import Referee from "../referee/Referee";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: Team;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum Team {
  WHITE,
  BLACK,
}

const initialBoardState: Piece[] = [];
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const team = p === 0 ? Team.BLACK : Team.WHITE;
  const y = p === 0 ? 7 : 0;
  initialBoardState.push({
    image: `./assets/rook_${type}.png`,
    x: 0,
    y: y,
    type: PieceType.ROOK,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/rook_${type}.png`,
    x: 7,
    y: y,
    type: PieceType.ROOK,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/knight_${type}.png`,
    x: 1,
    y: y,
    type: PieceType.KNIGHT,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/knight_${type}.png`,
    x: 6,
    y: y,
    type: PieceType.KNIGHT,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/bishop_${type}.png`,
    x: 2,
    y: y,
    type: PieceType.BISHOP,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/bishop_${type}.png`,
    x: 5,
    y: y,
    type: PieceType.BISHOP,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/queen_${type}.png`,
    x: 3,
    y: y,
    type: PieceType.QUEEN,
    team: team,
  });
  initialBoardState.push({
    image: `./assets/king_${type}.png`,
    x: 4,
    y: y,
    type: PieceType.KING,
    team: team,
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "./assets/pawn_w.png",
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: Team.WHITE,
  });
  initialBoardState.push({
    image: "./assets/pawn_b.png",
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: Team.BLACK,
  });
}

export default function ChessBoard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridx, setGridx] = useState(0);
  const [gridy, setGridy] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  function grabPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLElement;
    if (element.classList.contains("PIECE") && chessboard) {
      setGridx(Math.floor((e.clientX - chessboard.offsetLeft) / 75));
      setGridy(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75))
      );
      const x = e.clientX - 37.5;
      const y = e.clientY - 37.5;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 18.75;
      const minY = chessboard.offsetTop - 18.75;
      const maxX = minX + chessboard.clientWidth - 40;
      const maxY = minY + chessboard.clientHeight - 40;
      const x = e.clientX - 37.5;
      const y = e.clientY - 37.5;
      activePiece.style.position = "absolute";
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }
  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 75);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75)
      );
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridx && p.y === gridy) {
            const validMove = referee.isValidMove(
              gridx,
              gridy,
              x,
              y,
              p.type,
              p.team
            );
            if (validMove) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("top");
              activePiece.style.removeProperty("left");
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  }
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = i + j + 2;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(
        <Tile
          image={image}
          number={number}
          key={`${horizontalAxis[i]},${verticalAxis[j]}`}
        />
      );
    }
  }
  return (
    <div
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
      className="w-[320px] h-[320px] md:w-[600px] md:h-[600px] bg-[#823] grid grid-cols-8 z-[10000] shadow-2xl shadow-black"
    >
      {board}
    </div>
  );
}
