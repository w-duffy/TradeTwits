import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './landingPage.css'
import LoginFormModal from "../auth/LoginFormModal";


const LandingPage = () => {
  const user = useSelector((state) => state.session.user);
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

            <button id="landing-signup">
                Sign Up
            </button>
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
                <div>
                <button className="landing-body-signup-button">
                    Sign Up
                </button>
                </div>
                <div>
                Already have an Account?
                <a>login</a>
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
