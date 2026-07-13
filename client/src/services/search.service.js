import api from "./api";

export const searchEverything = async (query) => {
  const response = await api.get(
    `/search?query=${query}`
  );

  return response.data;
};