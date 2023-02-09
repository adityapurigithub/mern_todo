import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("token_todo");
    if (user) {
      navigate("/todos");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App min-h-screen bg-slate-800 text-center text-cyan-100 flex md:justify-center">
      <Outlet />
    </div>
  );
}

export default App;
