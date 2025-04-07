import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AlertProvider } from "./components/hooks/useNotify.tsx";
import { SidebarProvider } from "./components/hooks/context/sidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </AlertProvider>
  </StrictMode>,
);
