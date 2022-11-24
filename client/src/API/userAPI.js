import axios from "axios";
export const apiEndPoint = axios.create({
  // https://breakandlearn.up.railway.app/
  // http://localhost:3000/
  baseURL: "https://breakandlearn.up.railway.app/api/v1",
});

export const userAPI = {
  login: async (data) => {
    const res = await apiEndPoint.post(`users`, data);
    return res;
  },
  register: async (data) => {
    const res = await apiEndPoint.post(`users/createUser`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
  },
  getStudentsByCode: async (code) => {
    const res = await apiEndPoint.post(`utils/alumno/getStudentsByCode`, {
      code,
    });
    return res;
  },
  deleteStudent: async (id) => {
    const res = await apiEndPoint.delete(`utils/docente/deleteStudent/${id}`);
    return res;
  },
  getLeccionesVocabulary: async () => {
    const res = await apiEndPoint.get(`lecciones/getLeccionesVocabulary`);
    return res;
  },
  deleteLeccionVocabulary: async (id) => {
    const res = await apiEndPoint.delete(
      `lecciones/deleteLeccionVocabulary/${id}`
    );
    return res;
  },
  getLeccionesWriting: async () => {
    const res = await apiEndPoint.get(`lecciones/getLeccionesWriting`);
    return res;
  },
  deleteLeccionWriting: async (id) => {
    const res = await apiEndPoint.delete(
      `lecciones/deleteLeccionWriting/${id}`
    );
    return res;
  },
  getLeccionesReading: async () => {
    const res = await apiEndPoint.get(`lecciones/getLeccionesReading`);
    return res;
  },
  deleteLeccionReading: async (id) => {
    const res = await apiEndPoint.delete(
      `lecciones/deleteLeccionReading/${id}`
    );
    return res;
  },
  crearTest: async (data) => {
    const res = await apiEndPoint.post(`test/crearTest`, data);
    return res;
  },
  getTests: async () => {
    const res = await apiEndPoint.get(`test/getTests`);
    return res;
  },
  deleteTest: async (id) => {
    const res = await apiEndPoint.delete(`test/deleteTest/${id}`);
    return res;
  },
  setStudentCode: async (code) => {
    const res = await apiEndPoint.post(`utils/alumno/setCode`, { code });
    return res;
  },
  getStudentCode: async () => {
    const res = await apiEndPoint.get(`utils/alumno/getCode`);
    return res;
  },
  createMaterial: async (data) => {
    const res = await apiEndPoint.post(`materiales/createMaterial`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  },
  getMateriales: async () => {
    const res = await apiEndPoint.get(`materiales/getMateriales`);
    return res;
  },
  deleteMaterial: async (id) => {
    const res = await apiEndPoint.delete(`materiales/deleteMaterial/${id}`);
    return res;
  },
  getMaterialesAlu: async () => {
    const res = await apiEndPoint.get(`materiales/getMaterialesAlu`);
    return res;
  },
  getTestsAlu: async () => {
    const res = await apiEndPoint.get(`utils/alumno/getTests`);
    return res;
  },
  createTestActivity: async (data) => {
    const res = await apiEndPoint.post(`actividades/createTestActivity`, data);
    return res;
  },
  getTestsActivity: async () => {
    const res = await apiEndPoint.get(`actividades/getTestsActivity`);
    return res;
  },
  getVocabularyAlu: async () => {
    const res = await apiEndPoint.get(`utils/alumno/getVocabularyAlu`);
    return res;
  },
  getVocabularyActivity: async () => {
    const res = await apiEndPoint.get(`actividades/getVocabularyActivity`);
    return res;
  },
  getReadingActivity: async () => {
    const res = await apiEndPoint.get(`actividades/getReadingActivity`);
    return res;
  }
};
