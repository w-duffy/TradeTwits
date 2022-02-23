import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './landingPage.css'
import LoginFormModal from "../auth/LoginFormModal";
import SignUpModal from "../auth/SignUpFormModal";
import LoginForm from "../auth/LoginForm";
import { ModalAuth } from "../../Context/ModalAuth";

const LandingPage = ({ prop = false }) => {
  const user = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(prop);

  const hideButtonStyle = {
    display: 'none',
}

    if(user){
      return  <Redirect to='home' />
    }
  return (
    <>
    <div className="landing-page-container">

    <div className="landing-nav-container">

    <div className="landing-nav-top">
        <div className="landing-title">
            TradeTwits
        </div>
        <div>
            <div className="landing-nav-buttons">
                <div>

                <LoginFormModal />
                </div>
                <div>

                <div className="sign-up-div">
                    <SignUpModal />
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div className="landing-body">
        <div className="landing-text">
            <div className="landing-main-text">
            See what’s happening now in the markets
            </div>
            <div className="landing-second-text">
            See what actual investors and traders are saying in real time about the stocks you care about for free.
            </div>
            <div className="landing-body-signup-button-container">
                <div className="sign-up-button">
                <SignUpModal />
                </div>
                <div>

                <div className="login-sep">
                    <div className="have-account">

                Already have an Account?
                    </div>

                <div>

                <a
                className="login-a"
                onClick={() => setShowModal(true)}
                style={prop ? hideButtonStyle : null}
                >
                Log In
            </a>
                    </div>

                </div>
            {showModal && (
                <ModalAuth onClose={() => setShowModal(false)}>
                    <LoginForm />
                </ModalAuth>
            )}
            </div>
            </div>
        </div>
        <div className="landing-body-picture">
            <img className="landing-pic" src="https://coreybradshaw.files.wordpress.com/2014/02/group-communication.jpg" />
        </div>
    </div>
    <div className="landing-links">
        <div>

        links
        </div>
    </div>


    </div>
    </>
  );
};

export default LandingPage;
