import { useRef } from "react";
import Tile from "./Tile";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;
  pieces.push({ image: `./assets/rook_${type}.png`, x: 0, y: y });
  pieces.push({ image: `./assets/rook_${type}.png`, x: 7, y: y });
  pieces.push({ image: `./assets/knight_${type}.png`, x: 1, y: y });
  pieces.push({ image: `./assets/knight_${type}.png`, x: 6, y: y });
  pieces.push({ image: `./assets/bishop_${type}.png`, x: 2, y: y });
  pieces.push({ image: `./assets/bishop_${type}.png`, x: 5, y: y });
  pieces.push({ image: `./assets/queen_${type}.png`, x: 3, y: y });
  pieces.push({ image: `./assets/king_${type}.png`, x: 4, y: y });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: "./assets/pawn_w.png", x: i, y: 1 });
  pieces.push({ image: "./assets/pawn_b.png", x: i, y: 6 });
}

export default function ChessBoard() {
  const chessboardRef = useRef<HTMLDivElement>(null);
  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("PIECE")) {
      console.log("element");
      const x = e.clientX - 37.5;
      const y = e.clientY - 37.5;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      activePiece = element;
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
    if (activePiece) {
      activePiece = null;
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
