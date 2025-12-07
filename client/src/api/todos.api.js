import { api } from "@/config/axios";

export async function getAllTodos() {
    const response = await api.get("/todos");
    return response.data.data;
}

export async function createTodo(todoData) {
    const response = await api.post("/todo", todoData);
    return response.data.data;
}

export async function updateTodo(id, updates) {
    const response = await api.patch(`/todo/${id}`, updates);
    return response.data.data;
}

export async function deleteTodo(id) {
    const response = await api.delete(`/todo/${id}`);
    return response.data;
}

export async function toggleTodoComplete(id, completed) {
    const response = await api.patch(`/todo/${id}`, { completed });
    return response.data.data;
}
