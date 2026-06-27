import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-api-t2g3.onrender.com",
});

// Added /api/ to the paths below:
export const getTransactions = () => API.get("/api/transactions");

export const addTransaction = (data) =>
  API.post("/api/transactions", {
    title: data.title,
    amount: Number(data.amount),
    type: data.type,
    category: data.category,
  });

export const deleteTransaction = (id) =>
  API.delete(`/api/transactions/${id}`);