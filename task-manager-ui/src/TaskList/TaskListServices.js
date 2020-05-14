import axios from "axios";

const API_URL = "http://localhost:5000/task";

export const getAllTasksFromApi = async () => {
  try {
    const { data } = await axios.get(`${API_URL}`);
    return data;
  } catch (err) {
    return err;
  }
};

export const createTask = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}`, payload);
    return data;
  } catch (err) {
    return err;
  }
};

export const updateTask = async (payload) => {
  try {
    const { data } = await axios.put(`${API_URL}/${payload._id}`, payload);
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export default { getAllTasksFromApi, deleteTask, createTask, updateTask };
