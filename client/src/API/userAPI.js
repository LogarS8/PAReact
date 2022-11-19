import axios from "axios";
export const apiEndPoint = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const userAPI = {
  login: async (data) => {
    const res = await apiEndPoint.post(`users/`, data);
    return res.data;
  },
  register: async (data) => {
    const res = await apiEndPoint.post(`users/createUser`, data);
    return res.data;
  },
};
