import { createContext, ReactNode, useContext, useState } from 'react';
import { BaseContextProps } from 'src/global.config';
import useNotifier from 'src/hooks/useNotifier';
import { Breakpoint } from '@mui/material';
import { useWalletContext } from '../wallet-context/wallet-context';

type TOptions = {
    maxWidth: Breakpoint;
};
interface ModalContextInterface {
    open: boolean;
    title: ReactNode;
    content: ReactNode;
    closeModal: () => void;
    openModal: (title: ReactNode, content: ReactNode, op?: TOptions, openNoCondition?: boolean, checkConnectedOraichain?: boolean) => void;
    options: TOptions;
}

const ModalContext = createContext({ open: false } as ModalContextInterface);

export function ModalProvider({ children }: BaseContextProps) {
    const { oraichain } = useWalletContext();
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<ReactNode>('');
    const [content, setContent] = useState<ReactNode>(<></>);
    const { notifyError } = useNotifier();
    const [options, setOptions] = useState<TOptions>({ maxWidth: 'xs' });

    const closeModal = () => {
        setOptions((prev) => {
            return { ...prev, maxWidth: 'xs' };
        });
        setOpen(false);
    };
    const openModal = (title: ReactNode, content: ReactNode, op?: TOptions, openNoCondition?: boolean, checkConnectedOraichain: boolean = true) => {
        if (!openNoCondition) {
            if (!oraichain?.address && checkConnectedOraichain) {
                notifyError('You have not connected Oraichain network yet!');
                return;
            }
        }

        setTitle(title);
        setContent(content);
        setOptions((prev) => {
            return { ...prev, ...op };
        });

        setOpen(true);
    };

    return <ModalContext.Provider value={{ open, title, content, closeModal, openModal, options }}>{children}</ModalContext.Provider>;
}

export const useModalContext = () => useContext(ModalContext);
