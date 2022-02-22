import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './keydata.css'

const KeyData = ({stockDiscussion}) => {


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
        52WK LOW
          </div>
          <div className="key-data-data">
          {stockDiscussion.fifty_week_low}
          </div>
        </div>
        <div className="week-high">
        <div className="key-data-title">
          52WK HIGH
          </div>
          <div className="key-data-data">
          {stockDiscussion.fifty_week_high}
          </div>
        </div>
        <div className="market-cap">
        <div className="key-data-title">
          MKT CAP
          </div>
          <div className="key-data-data">
          {stockDiscussion.market_cap}
          </div>
        </div>
        <div className="volume">
        <div className="key-data-title">
          VOLUME
          </div>
          <div className="key-data-data">
          {stockDiscussion.volume}
          </div>
        </div>
        </div>

      </>
    );

};

export default KeyData;
