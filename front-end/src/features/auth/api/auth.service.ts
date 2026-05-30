import axios from "axios";

const API_URL =
  "https://sistema-activos-cesal.onrender.com/api";

export const login = async (
  correo: string,
  password: string
) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      correo,
      password,
    }
  );

  return response.data;
};