import api from "../axios";

export const getConversation = async (id: string, bearerToken: string) => {
  const response = await api.get(`/v1/ai/conversations/${id}/messages`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return response.data;
};
