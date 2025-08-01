import api from "../axios";

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  password: string,
  password_confirmation: string
) => {
  const formData = {
    full_name: `${firstName} ${lastName}`,
    email: email,
    password: password,
    role: role,
    password_confirmation: password_confirmation,
  };

  const response = await api.post(`/v1/auth/register`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
