import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalAuthContext = React.createContext();

export function ModalAuthProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalAuthContext.Provider value={value}>
                {children}
            </ModalAuthContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function ModalAuth({ onClose, children }) {
    const modalNode = useContext(ModalAuthContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content-auth">
                    {children}
            </div>
        </div>,
        modalNode
    );
}
