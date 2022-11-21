import axios from "axios";
export const apiEndPoint = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const userAPI = {
  login: async (data) => {
    const res = await apiEndPoint.post(`users/`, data);
    return res;
  },
  register: async (data) => {
    const res = await apiEndPoint.post(`users/createUser`, data);
    return res;
  },
  logout: async () => {
    const res = await apiEndPoint.get(`users/logout`);
    return res;
  },
  genCode: async () => {
    const res = await apiEndPoint.get(`utils/docente/genCode`);
    return res;
  }, 
  getCode: async () => {
    const res = await apiEndPoint.get(`utils/docente/getCode`);
    return res;
  },
  checkSession: async () => {
    const res = await apiEndPoint.get(`users/checkSession`);
    return res;
  }

};
