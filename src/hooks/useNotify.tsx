import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationContextProps {
  notify: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('success');

  const notify = (msg: string, msgType: NotificationType) => {
    setMessage(msg);
    setType(msgType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            <AlertTitle>
                {type}
            </AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
