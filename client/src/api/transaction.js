import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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