import ToDo from "./ToDo";
import { useState, useContext, useEffect } from "react";
import { todosContext } from "./contexts/tpdosContext";

export default function Todolist() {
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const { tasks, settasks } = useContext(todosContext);

  useEffect(() => {
    const storageTodo = JSON.parse(localStorage.getItem("tasks"));
    if (storageTodo) {
      settasks(storageTodo);
    }
    setIsLoaded(true); // ✔️ تم التحميل
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  function handleAddClick() {
    if (!titleInput.trim()) return;
    const newToDo = {
      id: Date.now(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    settasks([...tasks, newToDo]);
    setTitleInput("");
  }

  // فلترة المهام حسب النوع
  const filteredTasks =
    displayedTodosType === "all"
      ? tasks
      : displayedTodosType === "completed"
      ? tasks.filter((t) => t.isCompleted)
      : tasks.filter((t) => !t.isCompleted);

  const todoTask = filteredTasks.map((x) => <ToDo key={x.id} todo={x} />);

  return (
    <div className="todolist">
      <div className="head">
        <h2>مهامي</h2>
        <hr />
        <div className="butt">
          <button
            className={`but1 ${
              displayedTodosType === "non-completed" ? "active" : ""
            }`}
            onClick={() => setDisplayedTodosType("non-completed")}
          >
            غير منجز
          </button>

          <button
            className={`but2 ${
              displayedTodosType === "completed" ? "active" : ""
            }`}
            onClick={() => setDisplayedTodosType("completed")}
          >
            منجز
          </button>

          <button
            className={`but3 ${displayedTodosType === "all" ? "active" : ""}`}
            onClick={() => setDisplayedTodosType("all")}
          >
            الكل
          </button>
        </div>
      </div>

      {todoTask}

      <div className="tail">
        <button className="button" onClick={handleAddClick}>
          <i className="bi bi-plus-lg"></i>
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddClick();
          }}
        >
          <input
            className="input"
            placeholder="...عنوان المهمة"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
