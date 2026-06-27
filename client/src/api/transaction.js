import axios from "axios";

const API = axios.create({
  baseURL:  "https://expense-tracker-api-t2g3.onrender.com",
});

export const getTransactions = () => API.get("/transactions");

export const addTransaction = (data) =>
  API.post("/transactions", {
    title: data.title,
    amount: Number(data.amount),
    type: data.type,
    category: data.category,
  });

export const deleteTransaction = (id) =>
  API.delete(`/transactions/${id}`);