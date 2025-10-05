import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async () => {
  try {
    const response = await api.get('/show');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await api.post('/add_task', taskData);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (taskData) => {
  try {
    const response = await api.patch('/update_task', taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskData) => {
  try {
    const response = await api.patch('/update_task_status', taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};
