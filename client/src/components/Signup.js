import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    // console.log(e.target.name)

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(form);

    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: form,
      }),
    });

    const data = await response.json();

    alert(data.msg);
  };
  return (
    <div className="form-signup w-full p-5 flex justify-center md:items-center">
      <div className="overflow-hidden bg-blue-500 md:w-2/4 w-full h-max shadow shadow-stone-500 p-2 my-9 rounded flex justify-center md:items-center">
        <form
          className={`form md:w-2/3 p-5 ease-in-out duration-300`}
          onSubmit={handleRegister}
        >
          <h1 className="font-bold md:text-xl mb-5">Please Register In</h1>

          <div class="mb-5">
            <input
              type="text"
              name="name"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="mb-5">
            <input
              type="text"
              name="email"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="mb-5">
            <input
              type="password"
              name="password"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="text-center pt-1 mb-5 pb-1">
            <button
              class="inline-block bg-red-500 px-6 py-2.5 text-white font-semibold text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
              type="submit"
            >
              Register
            </button>
          </div>
          <div class="flex items-center">
            <p class=""> Already have an account? </p>

            <Link to="/login" className="text-slate-300 cursor-pointer mx-2">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
