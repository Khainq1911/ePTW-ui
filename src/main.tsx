import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AlertProvider } from './hooks/useNotify.tsx';
import { SidebarProvider } from './context/sidebarContext.tsx';
import PermitModalProvider from './context/permit-modal-context.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AlertProvider>
            <SidebarProvider>
                <PermitModalProvider>
                    <App />
                </PermitModalProvider>
            </SidebarProvider>
        </AlertProvider>
    </StrictMode>,
);
