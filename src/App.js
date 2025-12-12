import React, { useState } from "react";
import "./App.css";
import Todolist from "./ToDoList";
import "./ToDoList.css";
import { todosContext } from "./contexts/tpdosContext";

const initialtasks = [
  {
    id: 1,
    title: "قراءة كتاب",
    details: "الانجاز قبل نهايه الشهر",
    isCompleted: false,
  },
];

function App() {
  const [tasks, settasks] = useState(initialtasks);

  return (
    <div className="App">
      <todosContext.Provider value={{ tasks, settasks }}>
        <Todolist />
      </todosContext.Provider>
    </div>
  );
}

export default App;
