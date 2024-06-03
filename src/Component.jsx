import { useState } from "react";

function Component() {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
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

  function finishTask(index) {
    if (!tasks[index].checked) {
      setDoneTasks((d) => [...d, tasks[index]]);
    } else {
      setTasks((t) => [...t, tasks[index]]);
    }
  }

  function delElement(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }
  return (
    <>
      <div className="w-screen widthMain h-auto flex flex-col justify-center medium_gray mt-20 mx-10 rounded-lg shadow pb-10">
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
              key={index}
            >
              <div className="flex items-center">
                <input
                  id="checkInput"
                  className="w-6 h-6 rounded-lg cursor-pointer mr-4"
                  type="checkbox"
                  onClick={() => {
                    finishTask(index);
                  }}
                />
                <span className="text-lg">{task}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => pinElement(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-md light_gray cursor-pointer transition  hover:main_bg_clr"
                >
                  Pin
                </button>
                <button
                  onClick={() => delElement(index)}
                  className=" opacity-0 group-hover:opacity-100 p-2 rounded-md light_gray cursor-pointer transition  hover:bg-red-800"
                >
                  Del
                </button>
              </div>
            </li>
          ))}
        </ul>

        <ul
          id="doneList"
          className="w-4/5 pt-4 mx-auto border-t-2 border-gray-900"
        ></ul>
      </div>
    </>
  );
}

export default Component;
