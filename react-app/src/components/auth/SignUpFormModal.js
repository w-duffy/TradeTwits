import React, { useState } from 'react';
import { ModalAuth } from '../../Context/ModalAuth';
import SignUpForm from './SignUpForm';
import './login.css'

function SignUpModal({ prop = false }) {
    const [showModal, setShowModal] = useState(prop);

    const hideButtonStyle = {
        display: 'none',
    }

    return (
        <>
            <button
                className='login-splash-button'
                id='signup-splash'
                onClick={() => setShowModal(true)}
                style={prop ? hideButtonStyle : null}
            >
                Sign Up
            </button>
            {showModal && (
                <ModalAuth onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </ModalAuth>
            )}
        </>
    );
}

export default SignUpModal;
