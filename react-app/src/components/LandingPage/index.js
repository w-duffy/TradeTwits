import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './landingPage.css'
import LoginFormModal from "../auth/LoginFormModal";
import SignUpModal from "../auth/SignUpFormModal";
import LoginForm from "../auth/LoginForm";
import { ModalAuth } from "../../Context/ModalAuth";
import github from '../../images/logo-github.png'
import aa from '../../images/logo-aa.png'
import linkedin from '../../images/logo-linkedin.png'
import memehub from '../../images/logo-memehub.png'
import * as sessionActions from "../../store/session"
import { Oval } from  'react-loader-spinner'

const LandingPage = ({ prop = false }) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(prop);
  const [landingLoader, setLandingLoader] = useState(false)
  const hideButtonStyle = {
    display: 'none',
}

const handleClick = async (e) => {
  // await setLandingLoader(true)
  await setLandingLoader(true)
  await dispatch(sessionActions.login('demo@aa.io', 'password'))
  // await setLandingLoader(false)
  history.push('/home')
}

    if(user){
      return  <Redirect to='/home' />
    }

  return (
    <>
    {/* <div className="landing-page-container"> */}


    <div className="landing-nav-container">

    <div className="landing-nav-top">
        <a href='/' className="landing-title">
            TradeTwits
        </a>
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
                <div className="sign-up-div">
                <button onClick={handleClick} className='login-splash-button'>Demo

                </button>
                </div>
            </div>
        </div>
    </div>
    </div>
    {landingLoader && (

    <div className="landing-page-spinner">
    <div className="loading-text">
Loading latest stock data...
</div>
<div>
    <Oval color="#00BFFF" height={100} width={100} />
</div>

    </div>
)}
    <div className="landing-body">
    {!landingLoader && (
      <>
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
      </>
      )}
    </div>
    <div className="landing-links">


        <div className="Links">
            <a href="https://github.com/w-duffy/TradeTwits" target="_blank">
              <img
                src={github}
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/will-duffy-a46a7a8a/"
              target="_blank"
            >
              <img
                src={
                    linkedin
                }
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.appacademy.io/enterprise/hiring?utm_medium=ppc&utm_source=google&utm_campaign=14640069351&gclid=Cj0KCQiA8vSOBhCkARIsAGdp6RTVy85MXjwkVGN3f0-ripxBOp9676sXnVJ-uqyIB-7mNQSywGsWiLcaAijhEALw_wcB"
              target="_blank"
            >
              <img className="aa"
                src={aa}
                alt="App Academy"
              />
            </a>
            <a href="https://memehub-medium-clone.herokuapp.com/" target="_blank">
              <img className="memehub"
                src={memehub}
                alt="MemeHub"
              />
            </a>
          </div>

    </div>


    {/* </div> */}
    </>
  );
};

export default LandingPage;
