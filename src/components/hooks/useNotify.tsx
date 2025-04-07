import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

type AlertType = "success" | "error" | "warning" | "info";
type AlertTitleType = "Success" | "Error" | "Warning" | "Info";

interface AlertContextType {
  notify: (
    msg: string,
    msgType: AlertType,
    title: AlertTitleType,
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>(
    "success",
  );
  const [title, setTitle] = useState<AlertTitleType>("Success");

  const notify = (
    msg: string,
    msgType: AlertType,
    title: AlertTitleType,
  ) => {
    setTitle(title);
    setMessage(msg);
    setType(msgType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
