import Cookies from "js-cookie";
import React from "react";

const Nav = ({ user, navigate }) => {
  const handleLogout = () => {
    Cookies.remove("token_todo");
    alert("Logged Out Successfully!!!");
    navigate("/login");
  };
  return (
    <div className="absolute w-full">
      <nav class="w-full space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 ease-in duration-300 hover:bg-cyan-800">
        <div class="flex items-center justify-between ">
          <div>
            <h2 class="font-bold text-2xl text-light-900 ">ToDo App</h2>
          </div>
          <div className="flex md:gap-3 gap-1 right-0">
            {user ? (
              <>
                <span
                  className="text-semibold  rounded ease-in duration-300 cursor-pointer hover:bg-violet-600 p-2 md:px-4"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <span
                  className="text-semibold  rounded ease-in duration-300 cursor-pointer  hover:bg-violet-600 p-2 md:px-4"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
                <span
                  className="text-semibold  rounded ease-in duration-300 cursor-pointer  hover:bg-violet-600 p-2 md:px-4 "
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
