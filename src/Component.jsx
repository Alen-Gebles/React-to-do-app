import { useState } from "react";

function Component() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks((t) => [...t, taskInput]);
      setTaskInput("");
    }
  };

  const pinElement = (index) => {
    if (index > 0) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        const pinnedTask = updatedTasks.splice(index, 1)[0];
        updatedTasks.unshift(pinnedTask);
        return updatedTasks;
      });
    }
  };

  function delElement(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const crossWord = (index) => {
    const word = document.getElementById(`word${index}`);
    const checkInput = document.getElementById(`checkInput${index}`);

    if (checkInput.checked) {
      word.style.textDecoration = "line-through";
    } else {
      word.style.textDecoration = "none";
    }
  };

  return (
    <>
      <div className="widthMain h-auto flex flex-col justify-center medium_gray mt-20 rounded-lg shadow pb-5">
        <h2 className="text-center my-4 text-xl font-bold">To-Do List</h2>
        <div className="flex gap-2 mx-auto w-4/5 h-11 mb-4">
          <input
            placeholder="Add a task..."
            value={taskInput}
            type="text"
            className="h-full pl-4 w-full rounded-lg main_bg_clr"
            onChange={handleTaskInputChange}
          />
          <button
            onClick={handleAddTask}
            className="w-14 h-full main_bg_clr rounded-lg hover:bg-neutral-900 transition"
          >
            Add
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li
              className="group w-4/5 h-12 rounded-md mx-auto my-3 pl-4 pr-2 flex items-center justify-between hover:light_gray transition"
              key={`word${index}`}
              id={`word${index}`}
            >
              <div className="flex items-center">
                <input
                  id={`checkInput${index}`}
                  className="w-6 h-6 rounded-lg cursor-pointer mr-4"
                  type="checkbox"
                  onClick={() => crossWord(index)}
                />
                <span className="text-lg">{task}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => pinElement(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-md light_gray cursor-pointer transition hover:main_bg_clr"
                >
                  Pin
                </button>
                <button
                  onClick={() => delElement(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-md light_gray cursor-pointer transition hover:bg-red-800"
                >
                  Del
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Component;
