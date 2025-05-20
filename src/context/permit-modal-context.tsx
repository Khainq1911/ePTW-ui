import { createContext, ReactNode, useState } from 'react';

interface ContextValue {
    openModal: boolean;
    handleModalOpen: () => void;
    handleModalClose: () => void;
}

export const modalContext = createContext<ContextValue | undefined>(undefined);

export default function PermitModalProvider({ children }: { children: ReactNode }) {
    const [openModal, setOpenModal] = useState(false);

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const value = { openModal, handleModalClose, handleModalOpen };

    return <modalContext.Provider value={value}>{children}</modalContext.Provider>;
}
