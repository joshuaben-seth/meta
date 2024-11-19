import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [newTask, setNewTask] = useState('');
  const [draggingTask, setDraggingTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => ({ ...prevTasks, todo: [...prevTasks.todo, newTask] }));
      setNewTask('');
    }
  };

  const handleMoveTask = (task, fromColumn, toColumn) => {
    setTasks((prevTasks) => {
      const fromTasks = prevTasks[fromColumn].filter((t) => t !== task);
      const toTasks = [...prevTasks[toColumn], task];
      return { ...prevTasks, [fromColumn]: fromTasks, [toColumn]: toTasks };
    });
  };

  const handleDragStart = (task) => {
    setDraggingTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (column) => {
    if (draggingTask) {
      const fromColumn = Object.keys(tasks).find((c) => tasks[c].includes(draggingTask));
      if (fromColumn && fromColumn !== column) {
        handleMoveTask(draggingTask, fromColumn, column);
      }
    }
  };

  const columnTitles = {
    todo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done'
  };

  const columnColors = {
    todo: 'bg-blue-100',
    inProgress: 'bg-yellow-100',
    done: 'bg-green-100'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Productivity Board</h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Add a new task..."
            className="w-full max-w-lg p-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-r-lg transition duration-200 shadow-sm"
          >
            <Plus size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(tasks).map((column) => (
            <div
              key={column}
              className={`${columnColors[column]} p-4 rounded-lg shadow-md`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column)}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">{columnTitles[column]}</h2>
              <ul className="space-y-3">
                {tasks[column].map((task) => (
                  <li
                    key={task}
                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition duration-200"
                    draggable={true}
                    onDragStart={() => handleDragStart(task)}
                  >
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;