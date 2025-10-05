import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

const STATUS_OPTIONS = [
  { value: 'Pending', label: 'Pending' },
  { value: 'InProgress', label: 'In Progress' },
  { value: 'InReview', label: 'In Review' },
  { value: 'Completed', label: 'Completed' },
];

const TaskModal = ({ open, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    current_status: 'Pending',
    Assignee: '',
    ETA: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        current_status: task.current_status || 'Pending',
        Assignee: task.Assignee || '',
        ETA: task.ETA || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        current_status: 'Pending',
        Assignee: '',
        ETA: '',
      });
    }
  }, [task, open]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      current_status: 'Pending',
      Assignee: '',
      ETA: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {task ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Task Title"
              value={formData.title}
              onChange={handleChange('title')}
              fullWidth
              required
              variant="outlined"
            />
            
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.current_status}
                onChange={handleChange('current_status')}
                label="Status"
              >
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Assignee"
              value={formData.Assignee}
              onChange={handleChange('Assignee')}
              fullWidth
              variant="outlined"
            />
            
            <TextField
              label="ETA"
              type="datetime-local"
              value={formData.ETA}
              onChange={handleChange('ETA')}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {task ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskModal;
