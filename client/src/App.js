import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Nav } from "./components";

function App() {
  const navigate = useNavigate();

  const user = Cookies.get("token_todo");
  useEffect(() => {
    if (user) {
      navigate("/todos");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App h-screen bg-slate-800 text-center text-cyan-100 flex flex-col gap-4 relative">
      <Nav user={user} navigate={navigate} />

      <Outlet />
    </div>
  );
}

export default App;
