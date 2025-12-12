import { useContext, useState } from "react";
import { todosContext } from "./contexts/tpdosContext";

export default function ToDo({ todo }) {
  const { tasks, settasks } = useContext(todosContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  function handleCheckClick() {
    const updatedTasks = tasks.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    settasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleDelete() {
    const filtered = tasks.filter((t) => t.id !== todo.id);
    settasks(filtered);
    localStorage.setItem("tasks", JSON.stringify(filtered));
    setShowDeleteModal(false);
  }

  return (
    <div className="task">
      <div className={todo.isCompleted ? "todo-boody" : "todo-body"}>
        <div className="body-right">
          <button className="buti2" onClick={() => setShowDeleteModal(true)}>
            <i className="bi bi-trash"></i>
          </button>
          <button className="buti1" onClick={() => setShowEditModal(true)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button
            onClick={handleCheckClick}
            className={todo.isCompleted ? "buti4" : "buti3"}
          >
            {todo.isCompleted ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-check"></i>
            )}
          </button>
        </div>

        <div className="body-left">
          <h4>{todo.title}</h4>
          <p>{todo.details}</p>
        </div>
      </div>

      {/* ========== MODAL حذف ========== */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">تأكيد الحذف</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>هل أنت متأكد أنك تريد حذف المهمة؟</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL تعديل ========= */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">تعديل المهمة</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  type="text"
                  value={todo.title}
                  onChange={(e) => {
                    const updated = tasks.map((t) =>
                      t.id === todo.id ? { ...t, title: e.target.value } : t
                    );
                    settasks(updated);
                    localStorage.setItem("tasks", JSON.stringify(updated));
                  }}
                  placeholder="عنوان المهمة"
                />

                <textarea
                  className="form-control"
                  value={todo.details}
                  onChange={(e) => {
                    const updated = tasks.map((t) =>
                      t.id === todo.id ? { ...t, details: e.target.value } : t
                    );
                    settasks(updated);
                    localStorage.setItem("tasks", JSON.stringify(updated));
                  }}
                  placeholder="تفاصيل المهمة"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  إغلاق
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => setShowEditModal(false)}
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
