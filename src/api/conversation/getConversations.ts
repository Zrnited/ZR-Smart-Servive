import api from "../axios";

export const getConversations = async (bearerToken: string) => {
  const response = await api.get(`/v1/ai/conversations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return response.data;
};
