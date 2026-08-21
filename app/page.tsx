"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "./lib/supabase-browser";
import {
  addTask as addTaskAction,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
} from "./actions";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Edit states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabaseBrowser.auth.getUser();

    setUser(user);
  };

  getUser();
}, []);


  // Fetch tasks
  const fetchTasks = async () => {
    const { data, error } = await supabaseBrowser
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data || []);
    }

    setLoading(false);
  };

  // Load tasks when page opens
  // Load tasks after user is available
useEffect(() => {
  if (user) {
    fetchTasks();
  }
}, [user]);

  // Add a new task
  const addTask = async () => {
  if (!title.trim()) return;

  const result = await addTaskAction(title.trim());

  if (result?.error) {
    console.error(result.error);
    return;
  }

  setTitle("");
  fetchTasks();
};

  // Toggle task completion
  const toggleTask = async (id: number, completed: boolean) => {
  const result = await updateTaskAction(id, undefined, !completed);

  if (result?.error) {
    console.error("Error updating task:", result.error);
    return;
  }

  fetchTasks();
};

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  // Update task title
  const updateTask = async (id: number) => {
  if (!editingTitle.trim()) return;

  const result = await updateTaskAction(id, editingTitle.trim());

  if (result?.error) {
    console.error("Error updating task:", result.error);
    return;
  }

  setEditingId(null);
  setEditingTitle("");
  fetchTasks();
};

  // Delete task
  const deleteTask = async (id: number) => {
  const result = await deleteTaskAction(id);

  if (result?.error) {
    console.error("Error deleting task:", result.error);
    return;
  }

  fetchTasks();
};

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#1f2937",
          }}
        >
          TaskFlow
        </h1>

        <p
          style={{
            color: "#4b5563",
            marginBottom: "30px",
          }}
        >
          Organize your tasks and stay productive.
        </p>

        {/* Add Task */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            className="task-input"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            style={{
              flex: 1,
              padding: "14px 16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              outline: "none",
              color: "#1f2937",
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "14px 22px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Add Task
          </button>
        </div>

        {/* Tasks */}
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 10px",
              color: "#888",
            }}
          >
            <p>No tasks yet.</p>
            <p>Add your first task above!</p>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px",
                  marginBottom: "12px",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  background: task.completed ? "#f0fdf4" : "white",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      toggleTask(task.id, task.completed)
                    }
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />

                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateTask(task.id);
                        }

                        if (e.key === "Escape") {
                          setEditingId(null);
                          setEditingTitle("");
                        }
                      }}
                      autoFocus
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        border: "1px solid #9ca3af",
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#1f2937",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed ? "#888" : "#222",
                        fontSize: "16px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    flexShrink: 0,
                  }}
                >
                  {editingId === task.id ? (
                    <button
                      onClick={() => updateTask(task.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#16a34a",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(task)}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#374151",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

  
