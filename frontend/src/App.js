import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';
import Board from './components/Board';
import { getTasks, addTask, updateTask, updateTaskStatus } from './services/api';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      if (response.status === 200) {
        setTasks(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await addTask(taskData);
      if (response.status === 200) {
        await fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await updateTask(taskData);
      if (response.status === 200) {
        await fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskData) => {
    try {
      const response = await updateTaskStatus(taskData);
      if (response.status === 200) {
        await fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography>Loading...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SEFS Task Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Board
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;