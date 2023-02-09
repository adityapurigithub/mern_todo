import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App min-h-screen bg-slate-800 text-center text-cyan-100 flex md:justify-center p-5">
      <div className="overflow-hidden bg-blue-500 md:w-2/4 w-full h-max shadow shadow-stone-500 p-2 my-9 rounded flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
