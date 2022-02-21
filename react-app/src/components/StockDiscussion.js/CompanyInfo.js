import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './companyInfo.css'


const CompanyInfo = ({stockDiscussion}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ticker = useParams();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showEditPortfolio, setEditPortfolio] = useState(false);



    return (
      <>
      <div className="top-container">
          <div className="top-left">
          <div className="co-info-company-name">
              company name updated at
          </div>
          <div className="co-nfo-ticker-p-change">
              <div className="co-info-ticker">
{stockDiscussion.ticker} - {stockDiscussion.price.toFixed(2)}
              </div>
              <div className="co-info-p-change">
                  % change
                  </div>
          </div>
          </div>
          <div className="top-right">
              <div className="amount-of-watchers">
              Amount of watchers
              </div>
              <div className="add-co-to-portfolio">
                add to port
              </div>
          </div>
      </div>
      </>
    );

};

export default CompanyInfo;
