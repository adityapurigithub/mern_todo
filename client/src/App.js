import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <div className="App min-h-screen bg-slate-800 text-center text-cyan-100 flex md:justify-center">
      <Outlet />
    </div>
  );
}

export default App;
