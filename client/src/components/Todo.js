import React, { useEffect, useState } from "react";

const Home = () => {
  const [todoInput, setTodoInput] = useState("");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5000/todo/");

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setTodos(data.todos);
    }
    console.log(todos);
  };

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/todo/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: todoInput,
      }),
    });

    const data = await response.json();

    console.log(data);

    alert(data.msg);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleEdit = (e) => {};

  return (
    <div className="flex flex-col md:justify-center w-full items-center p-5 max-h-screen">
      <div className="h-3/4 md:w-2/3 w-full bg-slate-600 shadow rounded-xl overflow-y-auto text-center">
        <div className="text-xl italic font-bold p-5">Whats The Plan?</div>

        <div className="input my-5">
          <form className="flex justify-center" onSubmit={handleAddTodo}>
            <input
              class="w-3/4 bg-gray-200 text-xl text-red-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full leading-6 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
              type="text"
              placeholder="Add a Todo..."
              onChange={handleChange}
            />
            <button
              class=" px-8 font-semibold rounded-md bg-gray-900 text-white"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
        {todos &&
          todos.map((todo, i) => (
            <div className="todos flex justify-center h-24 w-full p-4 ">
              <div className="todo md:w-5/6 w-full shadow shadow-slate-400 flex justify-between items-center rounded-xl">
                <img
                  className="h-5 md:h-8  mx-3"
                  src="https://cdn-icons-png.flaticon.com/512/3472/3472583.png"
                />
                <div className="text-lg font-semibold w-2/3">{todo.name}</div>
                <div className="flex p-2 gap-2">
                  <img
                    className="h-5 md:h-6 "
                    src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
                    id="0"
                  />
                  <img
                    className="h-5 md:h-6 "
                    src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                    id="0"
                    name="4"
                    alt="done"
                  />

                  <img
                    className="h-5 md:h-6 "
                    src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                    alt="edit"
                    onClick={handleEdit}
                  />
                  <img
                    className="h-5 md:h-6 mr-6 cursor-pointer"
                    src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                    alt="delete"
                    onClick={() => handleDelete(todo._id)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
