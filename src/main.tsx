import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AlertProvider } from "./hooks/useNotify.tsx";
import { SidebarProvider } from "./hooks/context/sidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </AlertProvider>
  </StrictMode>,
);
