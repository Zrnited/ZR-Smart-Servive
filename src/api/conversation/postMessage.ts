import api from "../axios";

export const postMessage = async (
  id: string | null,
  message: string,
  file: File | null,
  voice_note: Blob | null,
  bearerToken: string
) => {
  if (!voice_note) {
    const data = {
      conversation_id: id,
      message: message,
      file: file,
      voice_note: voice_note,
    };
    // console.log(data);

    const response = await api.post(`/v1/ai/chat/send`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } else {
    // console.log("reading voice note aspect");
    const formData = new FormData();
    formData.append("conversation_id", id || "");
    formData.append("voice_note", voice_note, "recording.wav");
    const response = await api.post(`/v1/ai/chat/send`, formData, {
      headers: {
        // "Content-Type": "app",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  }
};
