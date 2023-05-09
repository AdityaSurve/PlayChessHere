import React from "react";
import ChessBoard from "./components/ChessBoard";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#202020] text-center flex-col overflow-hidden">
      <ChessBoard />
    </div>
  );
}

export default App;
