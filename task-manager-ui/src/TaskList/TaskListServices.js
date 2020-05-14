import axios from "axios";

const REQUEST_QUERY = process.env.REACT_APP_API_URL;

export const getAllTasksFromApi = async () => {
  try {
    const { data } = await axios.get(`${REQUEST_QUERY}`);
    return data;
  } catch (err) {
    return err;
  }
};

export const createTask = async (payload) => {
  try {
    const { data } = await axios.post(`${REQUEST_QUERY}`, payload);
    return data;
  } catch (err) {
    return err;
  }
};

export const updateTask = async (payload) => {
  try {
    const { data } = await axios.put(
      `${REQUEST_QUERY}/${payload._id}`,
      payload
    );
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteTask = async (id) => {
  try {
    const { data } = await axios.delete(`${REQUEST_QUERY}/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export default { getAllTasksFromApi, deleteTask, createTask, updateTask };
