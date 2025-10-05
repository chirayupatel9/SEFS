import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Column from './Column';
import TaskModal from './TaskModal';

const STATUSES = [
  { id: 'Pending', title: 'Pending', color: '#ffeb3b' },
  { id: 'InProgress', title: 'In Progress', color: '#2196f3' },
  { id: 'InReview', title: 'In Review', color: '#ff9800' },
  { id: 'Completed', title: 'Completed', color: '#4caf50' },
];

const Board = ({ tasks, onAddTask, onUpdateTask, onUpdateTaskStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.current_status === status);
  };

  const handleAddTask = (taskData) => {
    onAddTask(taskData);
    setModalOpen(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleUpdateTask = (taskData) => {
    onUpdateTask(taskData);
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleUpdateTaskStatus = (task, newStatus) => {
    const updatedTask = {
      ...task,
      current_status: newStatus,
    };
    onUpdateTaskStatus(updatedTask);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Task Board
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={2}>
        {STATUSES.map((status) => (
          <Grid item xs={12} sm={6} md={3} key={status.id}>
            <Paper
              elevation={2}
              sx={{
                minHeight: '500px',
                backgroundColor: status.color + '20',
                border: `2px solid ${status.color}`,
              }}
            >
              <Box p={2}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: status.color,
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  {status.title}
                </Typography>
                <Column
                  tasks={getTasksByStatus(status.id)}
                  status={status}
                  onEditTask={handleEditTask}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
      />
    </Box>
  );
};

export default Board;
