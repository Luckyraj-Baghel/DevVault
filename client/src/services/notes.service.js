import api from "./api";

export const getAllNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export const togglePinNote = async (id) => {
  const response = await api.patch(`/notes/${id}/pin`);
  return response.data;
};