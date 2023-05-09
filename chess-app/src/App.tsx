import React from "react";
import ChessBoard from "./components/ChessBoard";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-center flex-col overflow-hidden relative">
      <img
        src="./assets/chess_bg.png"
        alt=""
        className="fixed h-[1080px] w-[1920px]"
      />
      <ChessBoard />
    </div>
  );
}

export default App;
