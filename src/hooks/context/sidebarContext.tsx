import { createContext, ReactNode, useState } from "react";

interface ContextProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
}
export const sidebarContext = createContext<ContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };
  
  return (
    <sidebarContext.Provider value={{ openSidebar, toggleSidebar }}>
      {children}
    </sidebarContext.Provider>
  );
};
