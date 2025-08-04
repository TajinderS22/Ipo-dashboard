// ModalContext.tsx
import { createContext,  } from 'react';

type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);



