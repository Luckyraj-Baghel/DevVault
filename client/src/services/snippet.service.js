import api from "./api";

export const getAllSnippets = async () => {
  const response = await api.get("/snippets");
  return response.data;
};

export const createSnippet = async (snippetData) => {
  const response = await api.post("/snippets", snippetData);
  return response.data;
};

export const updateSnippet = async (id, snippetData) => {
  const response = await api.put(`/snippets/${id}`, snippetData);
  return response.data;
};

export const deleteSnippet = async (id) => {
  const response = await api.delete(`/snippets/${id}`);
  return response.data;
};