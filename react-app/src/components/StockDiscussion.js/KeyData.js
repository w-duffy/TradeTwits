import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './keydata.css'

const KeyData = () => {


    return (
        <>
        <div className="key-data-container">

            <div className="key-data-first">
        <div className="key-data">
        Key Data
        </div>
        <div></div>
        </div>
        <div className="week-low">
        <div className="key-data-title">
          52WK Low
          </div>
          <div className="key-data-data">
          58.85
          </div>
        </div>
        <div className="week-high">
        <div className="key-data-title">
          52WK high
          </div>
          <div className="key-data-data">
          58.85
          </div>
        </div>
        <div className="market-cap">
        <div className="key-data-title">
          Mkt Cap
          </div>
          <div className="key-data-data">
          58.85
          </div>
        </div>
        <div className="volume">
        <div className="key-data-title">
          Volume
          </div>
          <div className="key-data-data">
          58.85
          </div>
        </div>
        </div>

      </>
    );

};

export default KeyData;
