import React, { useEffect, useState } from "react";

const Home = () => {
  const [todoInput, setTodoInput] = useState("");

  const [todos, setTodos] = useState([]);

  //for editing a todo
  const [editTodo, setEditTodo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchTodos();

    // .. for edit part
    if (Object.keys(editTodo).length !== 0) {
      setTodoInput(editTodo.name);
      console.log(todoInput);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [editTodo]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5000/todo/");

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      setTodos(data.todos);
    }
  };

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (Object.keys(editTodo).length === 0) {
      createTodo();
    } else {
      let id = editTodo._id;
      saveEditedTodo(id);
    }
  };

  const createTodo = async () => {
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

    if (response.ok) {
      fetchTodos();
      setTodoInput("");
    }
  };

  const saveEditedTodo = async (id) => {
    const response = await fetch(`http://localhost:5000/todo/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        data: todoInput,
      }),
    });

    const data = await response.json();

    alert(data.msg);

    if (response.ok) {
      fetchTodos();
      setTodoInput("");
      setEditMode(false);
    }
  };
  const handleDelete = async (id) => {
    console.log(id);

    const response = await fetch(`http://localhost:5000/todo/delete/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    alert(data.msg);
    if (response.ok) {
      fetchTodos();
    }
  };

  const handleEdit = (todo) => {
    console.log(todo);
    setEditTodo(todo);
  };

  const handleStatus = (e, id) => {
    console.log(e.target.name);
    if (e.target.name === "done") {
      statusUpdate(true, id);
    } else {
      statusUpdate(false, id);
    }
  };

  const statusUpdate = async (status, id) => {
    let done;
    if (status) {
      done = true;
    } else {
      done = false;
    }

    const response = await fetch(`http://localhost:5000/todo/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        data: done,
      }),
    });

    const data = await response.json();

    console.log(data.msg);
  };

  return (
    <div className="flex flex-col md:justify-center w-full items-center p-5 h-full">
      <div className="mt-10 h-4/5 md:w-2/3 w-full bg-slate-600 shadow rounded-xl overflow-y-auto text-center">
        <div className="glow text-2xl md:text-3xl italic font-bold p-5">
          Whats The Plan?
        </div>

        <div className="input my-5">
          <form className="flex justify-center" onSubmit={handleAddTodo}>
            <input
              class="w-3/4 bg-gray-200 text-xl text-red-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full leading-6 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
              type="text"
              placeholder="Add a Todo..."
              value={todoInput}
              onChange={handleChange}
            />
            {editMode ? (
              <button
                class=" px-8 font-semibold rounded-md bg-gray-900 text-white"
                type="submit"
              >
                Edit
              </button>
            ) : (
              <button
                class=" px-8 font-semibold rounded-md bg-gray-900 text-white"
                type="submit"
              >
                Add
              </button>
            )}
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
                  {done ? (
                    <img
                      name="not-done"
                      className="h-5 md:h-6 cursor-pointer"
                      src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                      alt="done"
                      onClick={(e) => handleStatus(e, todo._id)}
                    />
                  ) : (
                    <img
                      name="done"
                      className="h-5 md:h-6 cursor-pointer"
                      src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
                      onClick={(e) => handleStatus(e, todo._id)}
                    />
                  )}

                  <img
                    className="h-5 md:h-6 cursor-pointer"
                    src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                    alt="edit"
                    onClick={() => handleEdit(todo)}
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
        {todos.length === 0 && (
          <div className="w-inherit flex flex-col items-center">
            <img src="https://ouch-cdn2.icons8.com/FJEiV3x9qjSs-JComNUliI-fOzwuRCzNqohb5e_aexU/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg4/Lzg2YTMxMTI2LTc4/NzktNDI4My05Yjky/LWYyMjliNDc0OGU4/NC5zdmc.png" />
            <span className=" text-2xl font-semibold text-slate-800">
              Nothing in Your List!!!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
