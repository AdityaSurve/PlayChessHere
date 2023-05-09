import React from "react";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function ChessBoard() {
  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = i + j;
      if (number % 2 === 0) {
        board.push(
          <div className="flex justify-center items-center bg-[#825A34]">
            {horizontalAxis[i]}
            {verticalAxis[j]}
          </div>
        );
      } else {
        board.push(
          <div className="flex justify-center items-center bg-[#C29E65]">
            {horizontalAxis[i]}
            {verticalAxis[j]}
          </div>
        );
      }
    }
  }
  return (
    <div className="w-[640px] h-[640px] bg-[#823] grid grid-cols-8">
      {board}
    </div>
  );
}
