import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../Search";
import "./navigation.css";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import StockDiscussion from "../StockDiscussion.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { searchOptions, tickers } from "../Search/tickers";
import { createBrowserHistory } from "history";

const NavigationBar = () => {
  const user = useSelector((state) => state.session.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const refHandler = useRef(null);

  const openProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());
    await setShowProfileMenu(!showProfileMenu);
    history.push("/");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tickerSearch, setTickerSearch] = useState("");
  const browserHistory = createBrowserHistory();

  const stockDiscussion = useSelector((state) => state.stockDiscussionReducer);

  useEffect(() => {
    setSearchTerm("");
  }, []);

  const handleWatchlistRoute = async (e, t) => {
    e.preventDefault()
    setTickerSearch(t);
  };

  useEffect(
    async (e) => {
      if (searchTerm === "") {
        return setSearchTerm("");
      }

      const filteredResult = searchOptions.filter((word) => {
        return (
          word[0].includes(searchTerm.toUpperCase()) ||
          word[1].toUpperCase().includes(searchTerm.toUpperCase())
        );
      });

      const finalResult = filteredResult.slice(0, 5);
      setSearchResults(finalResult);
    },
    [searchTerm]
  );

  useEffect(() => {
    document.addEventListener("click", clickedOffSearch, false);
    return () => {
      document.removeEventListener("click", clickedOffSearch, false);
    };
  }, []);

  const clickedOffSearch = (event) => {
    if (refHandler.current && !refHandler.current.contains(event.target)) {
      setSearchTerm("");
    }
  };

  const trendingStocks = Object.entries(user.trending);
  const filterArrStocks = trendingStocks.filter((stock) => {
    return tickers.includes(stock[0]);
  });
  const feedData = filterArrStocks.slice(0, 5);
  return (
    <>
      <div className="nav-container">
        <nav className="navbar">
          <a href={`/home`} className="tradetwits-title">
            TradeTwits
          </a>

          <div className="search-bar-div">

            <div ref={refHandler} className="search_container">
              <div className="search__bar">
                <input
                  type="text"
                  id="search-input"
                  value={searchTerm}
                  placeholder="Ticker or Company Name"
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
              </div>
              <div id="search_results">
                {searchTerm && (
                  <>
                    {searchResults.map((result) => (
                      <>
                        <div className="search-result-select">
                          {stockDiscussion.id && (
                            <a
                              onClick={() => {
                                setSearchTerm("");
                                setTickerSearch(result[0]);
                                browserHistory.push(`/discussion/${result[0]}`);
                              }}
                            >
                              {" "}
                              {result[0]} - {result[1]}{" "}
                            </a>
                          )}
                          {!stockDiscussion.id && (
                            <a
                              onClick={() => {
                                setSearchTerm("");
                                setTickerSearch(result[0]);
                                history.push(`/discussion/${result[0]}`);
                              }}
                            >
                              {" "}
                              {result[0]} - {result[1]}{" "}
                            </a>
                          )}
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          {user && (
            <>
              <div className="profile-container">
                <div>
                  <div className="profile-button" onClick={openProfileMenu}>
                    <img
                      className="profile-picture-on-button"
                      src={user.profile_picture}
                    ></img>
                  </div>
                </div>
                {showProfileMenu && (
                  <ul className="profile-ul">
                    <li className="profile-li">
                      <a className="profile-a" href={`/profile/${user.id}`}>
                        My Profile
                      </a>
                    </li>
                    <li className="profile-li">
                      <a
                        className="profile-a"
                        href="/"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </nav>
        <div className="trending-container">
          <div className="three">
            <div className="three-container">
              DOW
              {user.dow_percent_change < 0 && (
                <div className="three-p-change-red">
                  {user.dow_percent_change.toFixed(2)}%
                </div>
              )}
              {user.dow_percent_change > 0 && (
                <div className="three-p-change-green">
                  +{user.dow_percent_change.toFixed(2)}%
                </div>
              )}
            </div>

            <div className="three-container">
              SAP
              {user.sp_percent_change < 0 && (
                <div className="three-p-change-red">
                  {user.sp_percent_change.toFixed(2)}%
                </div>
              )}
              {user.sp_percent_change > 0 && (
                <div className="three-p-change-green">
                  +{user.sp_percent_change.toFixed(2)}%
                </div>
              )}
            </div>
            <div className="three-container">
              NASDAQ
              {user.nas_percent_change < 0 && (
                <div className="three-p-change-red">
                  {user.nas_percent_change.toFixed(2)}%
                </div>
              )}
              {user.nas_percent_change > 0 && (
                <div className="three-p-change-green">
                  +{user.nas_percent_change.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
          <div className="feed">

            {feedData.length} Currently Trending:
            {feedData.map((data) => (
              <div className="three-container-feed">

                {stockDiscussion.id && (
                  <a
                    className="a-select"
                    onClick={() => {
                      setSearchTerm("");
                      setTickerSearch(data[0]);
                      browserHistory.push(`/discussion/${data[0]}`);
                    }}
                  >
                    <div>{data[0]}</div>
                    {data[1] < 0 && (
                      <div className="three-p-change-red">
                        {data[1].toFixed(2)}%
                      </div>
                    )}

                    {data[1] > 0 && (
                      <div className="three-p-change-green">
                        +{data[1].toFixed(2)}%
                      </div>
                    )}
                  </a>
                )}

                {!stockDiscussion.id && (
                  <a
                    className="a-select"
                    onClick={() => {
                      setSearchTerm("");
                      setTickerSearch(data[0]);
                      history.push(`/discussion/${data[0]}`);
                    }}
                  >
                    <div>{data[0]}</div>


                    {data[1] < 0 && (
                      <div className="three-p-change-red">
                        {data[1].toFixed(2)}%
                      </div>
                    )}

                    {data[1] > 0 && (
                      <div className="three-p-change-green">
                        +{data[1].toFixed(2)}%
                      </div>
                    )}
                  </a>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>

      <Route path="/discussion/:ticker" exact={true}>
        <StockDiscussion handleWatchlistRoute={handleWatchlistRoute} tickerSearch={tickerSearch} />
      </Route>
    </>
  );
};

export default NavigationBar;
