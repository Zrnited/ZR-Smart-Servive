import api from "../axios";

export const login = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password,
  };

  const response = await api.post(`/v1/auth/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
