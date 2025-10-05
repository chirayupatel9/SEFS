import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const STATUS_OPTIONS = [
  { value: 'Pending', label: 'Pending', color: '#ffeb3b' },
  { value: 'InProgress', label: 'In Progress', color: '#2196f3' },
  { value: 'InReview', label: 'In Review', color: '#ff9800' },
  { value: 'Completed', label: 'Completed', color: '#4caf50' },
];

const TaskCard = ({ task, onEdit, onStatusChange, currentStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flexGrow={1}>
            <Typography variant="h6" component="h3" gutterBottom>
              {task.title || 'Untitled Task'}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {task.description || 'No description'}
            </Typography>
            
            {task.Assignee && (
              <Chip
                label={`Assignee: ${task.Assignee}`}
                size="small"
                sx={{ mb: 1 }}
              />
            )}
            
            {task.ETA && (
              <Typography variant="caption" display="block" color="text.secondary">
                ETA: {formatDate(task.ETA)}
              </Typography>
            )}
          </Box>
          
          <Box>
            <IconButton size="small" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          {STATUS_OPTIONS
            .filter(status => status.value !== currentStatus)
            .map((status) => (
              <MenuItem
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    width={12}
                    height={12}
                    borderRadius="50%"
                    bgcolor={status.color}
                    mr={1}
                  />
                  {status.label}
                </Box>
              </MenuItem>
            ))}
        </Menu>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
