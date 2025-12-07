import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    fetchTodos,
    addNewTodo,
    toggleTodoCompleted,
    deleteTodoItem,
    updateTodoItem,
} from "@/store/slice/todoSlice";
import { Trash2, Plus, AlertCircle, CheckCircle2, Edit3 } from "lucide-react";

const TodoLists = () => {
    const dispatch = useDispatch();
    const { todosList, loading, error } = useSelector((state) => state.todos);

    const [value, setValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [activeSection, setActiveSection] = useState("active");

    // Fetch todos on component mount
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const activeTodos = (todosList || []).filter((todo) => !todo.completed);
    const completedTodos = (todosList || []).filter((todo) => todo.completed);
    const displayedTodos =
        activeSection === "active" ? activeTodos : completedTodos;

    async function handleTodoSubmit(e) {
        e.preventDefault();
        if (value.trim() === "") {
            toast.error("Please add some data first.");
            return;
        }

        try {
            if (editingId) {
                // Update existing todo
                const result = await dispatch(
                    updateTodoItem({
                        id: editingId,
                        updates: { todo: value },
                    })
                );
                if (result.payload) {
                    toast.success("Todo updated successfully!");
                }
                setEditingId(null);
            } else {
                // Create new todo
                const result = await dispatch(
                    addNewTodo({ todo: value, completed: false })
                );
                if (result.payload) {
                    toast.success("Todo added successfully!");
                }
            }
            setValue("");
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Error:", error);
        }
    }

    function handleTodoEdit(todoId) {
        const todoToEdit = todosList.find(
            (t) => t.id === todoId || t._id === todoId
        );
        if (todoToEdit && !todoToEdit.completed) {
            setValue(todoToEdit.todo);
            setEditingId(todoId);
        } else if (todoToEdit?.completed) {
            toast.error("Cannot edit completed todos");
        }
    }

    async function handleToggleComplete(todoId) {
        const todo = todosList.find((t) => t.id === todoId || t._id === todoId);
        if (todo) {
            const result = await dispatch(
                toggleTodoCompleted({
                    id: todoId,
                    completed: !todo.completed,
                })
            );
            if (result.payload) {
                toast.success("Todo status updated!");
            }
        }
    }

    async function handleDeleteTodo(todoId) {
        const result = await dispatch(deleteTodoItem(todoId));
        if (result.payload) {
            toast.success("Todo deleted successfully!");
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-8">
                {/* Error display */}
                {error && (
                    <div className="mb-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </p>
                    </div>
                )}

                {/* Add Todo Form */}
                <form onSubmit={handleTodoSubmit} className="mb-8">
                    <div className="rounded-xl shadow-lg p-4 sm:p-6 border bg-card border-border">
                        <div className="flex gap-2 sm:gap-3">
                            <input
                                type="text"
                                autoFocus={true}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="What needs to be done?"
                                disabled={loading}
                                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition text-sm sm:text-base disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition duration-200 whitespace-nowrap text-sm sm:text-base shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={18} />
                                <span className="hidden sm:inline">
                                    {editingId ? "Update Task" : "Add Task"}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>

                {/* Todo List */}
                <div className="rounded-xl shadow-lg border bg-card border-border overflow-hidden lg:max-h-[50vh] max-h-[55vh] overflow-y-auto">
                    {/* Tabs */}
                    <div className="flex border-b border-border bg-muted/50">
                        <button
                            onClick={() => setActiveSection("active")}
                            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                                activeSection === "active"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Active ({activeTodos.length})
                        </button>
                        <button
                            onClick={() => setActiveSection("completed")}
                            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                                activeSection === "completed"
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            Completed ({completedTodos.length})
                        </button>
                    </div>
                    {/* Todo Items */}
                    {displayedTodos && displayedTodos.length > 0 ? (
                        <ul className="divide-y divide-border">
                            {displayedTodos.map((todo) => (
                                <li
                                    key={todo.id || todo._id}
                                    className={`p-4 sm:p-6 hover:opacity-75 transition duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-card ${
                                        todo.completed ? "opacity-75" : ""
                                    }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <button
                                                onClick={() =>
                                                    handleToggleComplete(
                                                        todo.id || todo._id
                                                    )
                                                }
                                                disabled={loading}
                                                className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed ${
                                                    todo.completed
                                                        ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-500/30"
                                                        : "border-muted-foreground/40 hover:border-muted-foreground bg-background hover:bg-muted/50"
                                                }`}
                                            >
                                                {todo.completed && (
                                                    <CheckCircle2
                                                        size={14}
                                                        className="text-white drop-shadow-sm"
                                                    />
                                                )}
                                            </button>
                                            <div className="min-w-0 flex-1">
                                                <p
                                                    className={`text-sm sm:text-lg font-medium break-normal ${
                                                        todo.completed
                                                            ? "line-through text-muted-foreground"
                                                            : ""
                                                    }`}
                                                >
                                                    {todo.todo}
                                                </p>
                                                <p className="text-xs sm:text-sm mt-1.5 text-muted-foreground">
                                                    {new Date(
                                                        todo.updatedAt
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3">
                                        {!todo.completed && (
                                            <button
                                                onClick={() =>
                                                    handleTodoEdit(
                                                        todo.id || todo._id
                                                    )
                                                }
                                                disabled={loading}
                                                className="px-3 py-2 text-sm font-medium rounded-lg hover:opacity-80 transition duration-200 border border-blue-500/30 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Edit3 size={14} />
                                                <span className="hidden sm:inline">
                                                    Edit
                                                </span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                handleDeleteTodo(
                                                    todo.id || todo._id
                                                )
                                            }
                                            disabled={loading}
                                            className="px-3 py-2 text-sm font-medium rounded-lg hover:opacity-80 transition duration-200 border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 size={14} />
                                            <span className="hidden sm:inline">
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 sm:p-12 text-center">
                            <div className="text-5xl sm:text-6xl mb-4 flex justify-center text-muted-foreground">
                                <AlertCircle size={64} />
                            </div>
                            <p className="text-base sm:text-lg font-medium mb-2">
                                {loading
                                    ? "Loading..."
                                    : activeSection === "active"
                                    ? "No active tasks"
                                    : "No completed tasks"}
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                {loading
                                    ? "Please wait..."
                                    : activeSection === "active"
                                    ? "Add a task above to get started!"
                                    : "Complete some tasks to see them here!"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Stats */}
                {todosList && todosList.length > 0 && (
                    <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center p-4 sm:p-6 rounded-xl bg-secondary/30">
                            <p className="text-sm sm:text-base">
                                <span className="font-bold text-lg sm:text-xl text-primary">
                                    {todosList.length}
                                </span>{" "}
                                Total{" "}
                                {todosList.length === 1 ? "task" : "tasks"}
                            </p>
                        </div>
                        <div className="text-center p-4 sm:p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                            <p className="text-sm sm:text-base">
                                <span className="font-bold text-lg sm:text-xl text-green-600">
                                    {activeTodos.length}
                                </span>{" "}
                                Active{" "}
                                {activeTodos.length === 1 ? "task" : "tasks"}
                            </p>
                        </div>
                        <div className="text-center p-4 sm:p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <p className="text-sm sm:text-base">
                                <span className="font-bold text-lg sm:text-xl text-blue-600">
                                    {completedTodos.length}
                                </span>{" "}
                                Completed{" "}
                                {completedTodos.length === 1 ? "task" : "tasks"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoLists;
