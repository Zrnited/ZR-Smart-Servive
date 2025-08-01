import api from "../axios";

export const postMessage = async (
  id: string | null,
  message: string,
  file: File | null,
  voice_note: File | Blob | null,
  bearerToken: string
) => {
  const data = {
    conversation_id: id,
    message: message,
    file: file,
    voice_note: voice_note,
  };

  const response = await api.post(`/v1/ai/chat/send`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return response.data;
};
