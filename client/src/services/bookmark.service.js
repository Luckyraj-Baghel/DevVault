import api from "./api";

export const getAllBookmarks = async () => {
  const response = await api.get("/bookmarks");
  return response.data;
};

export const createBookmark = async (bookmarkData) => {
  const response = await api.post(
    "/bookmarks",
    bookmarkData
  );

  return response.data;
};

export const updateBookmark = async (
  id,
  bookmarkData
) => {
  const response = await api.put(
    `/bookmarks/${id}`,
    bookmarkData
  );

  return response.data;
};

export const deleteBookmark = async (id) => {
  const response = await api.delete(
    `/bookmarks/${id}`
  );

  return response.data;
};