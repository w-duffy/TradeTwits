import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
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
                className='login-splash-button'
                onClick={() => setShowModal(true)}
                style={prop ? hideButtonStyle : null}
            >
                Sign In
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
