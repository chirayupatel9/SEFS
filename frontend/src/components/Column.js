import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';

const Column = ({ tasks, status, onEditTask, onUpdateTaskStatus }) => {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
      </Typography>
      <Box>
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id || index}
            task={task}
            onEdit={() => onEditTask(task)}
            onStatusChange={(newStatus) => onUpdateTaskStatus(task, newStatus)}
            currentStatus={status.id}
          />
        ))}
        {tasks.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 2, fontStyle: 'italic' }}
          >
            No tasks in this column
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Column;
