import React, { useState } from 'react';
import { ModalAuth } from '../../Context/ModalAuth';
import LoginForm from './LoginForm';
import './login.css'

function LoginFormModal({ prop = false }) {
    const [showModal, setShowModal] = useState(prop);

    const hideButtonStyle = {
        display: 'none',
    }

    return (
        <>
            <button
                className='login-splash-button-l'
                onClick={() => setShowModal(true)}
                style={prop ? hideButtonStyle : null}
            >
                Log In
            </button>
            {showModal && (
                <ModalAuth onClose={() => setShowModal(false)}>
                    <LoginForm />
                </ModalAuth>
            )}
        </>
    );
}

export default LoginFormModal;
