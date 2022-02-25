import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../NavigationBar/navigation.css";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import { searchOptions, tickers } from "../Search/tickers";
import { createBrowserHistory } from "history";
import Main from "../Main";
import '../Splash/splash.css'
import './myProfile.css'
import { ModalAuth } from "../../Context/ModalAuth";
import EditProfileForm from "./EditProfile";
import { useParams } from 'react-router-dom';



const MyProfile = ({ prop = false }) => {
  const user = useSelector((state) => state.session.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const refHandler = useRef(null);
  const refHandlerSplash = useRef(null);
  const [showEditPortfolio, setEditPortfolio] = useState(false);
  const [showModal, setShowModal] = useState(prop);
  const { userId }  = useParams();
    console.log("USER ID", userId)
  const hideButtonStyle = {
    display: 'none',
}

  const openProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());
    await setShowProfileMenu(!showProfileMenu);
    history.push("/");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [userProf, setUserProf] = useState("");
  const [searchTermSplash, setSearchTermSplash] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsSplash, setSearchResultsSplash] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const browserHistory = createBrowserHistory();

  const stockDiscussion = useSelector((state) => state.stockDiscussionReducer);

  useEffect(() => {
    setSearchTerm("");
  }, []);

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


//   --------------------
  useEffect(() => {
    setSearchTermSplash("");
  }, []);

  useEffect(
    async (e) => {
      if (searchTermSplash === "") {
        return setSearchTermSplash("");
      }

      const filteredResult = searchOptions.filter((word) => {
        return (
          word[0].includes(searchTermSplash.toUpperCase()) ||
          word[1].toUpperCase().includes(searchTermSplash.toUpperCase())
        );
      });

      const finalResult = filteredResult.slice(0, 5);
      setSearchResultsSplash(finalResult);
    },
    [searchTermSplash]
  );

  useEffect(() => {
    document.addEventListener("click", clickedOffSearchSplash, false);
    return () => {
      document.removeEventListener("click", clickedOffSearchSplash, false);
    };
  }, []);

  const clickedOffSearchSplash = (event) => {
    if (refHandlerSplash.current && !refHandlerSplash.current.contains(event.target)) {
      setSearchTermSplash("");
    }
  };


//   useEffect(() => {
//     const id = user.id

//       async function getDetails() {
//       await dispatch(getPortfolioDetails(id))
//     }
//   getDetails()

// }, [])

  const trendingStocks = Object.entries(user.trending);
  const filterArrStocks = trendingStocks.filter((stock) => {
    return tickers.includes(stock[0]);
  });
  const feedData = filterArrStocks.slice(0, 5);







  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user2 = await response.json();
      setUserProf(user2);
      setIsLoaded(!isLoaded)
      console.log("USER", user2)
    })();
  }, [userId]);










  return (
    <>
      <div className="nav-container">
        <nav className="navbar">
          <a href={`/home`} className="tradetwits-title">
            TradeTwits
          </a>
          {/* <div>
                Rooms
                Shows
                Rankings
                Earnings
                Newsletters
                Shop
            </div> */}
          <div className="search-bar-div">
            {/* <SearchBar /> */}
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

                    {/* <li className="profile-li">
                      <a className="profile-a" href={`/profile/${user.id}`}>
                        Edit Profile
                      </a>
                    </li> */}

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
              {/* <div>Post</div> */}
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
            {/* <div className='three-container-feed'> */}
            {feedData.length} Currently Trending:
            {feedData.map((data) => (
              <div className="three-container-feed">
                {/* <div className='three-container-feed'> */}
                {stockDiscussion.id && (
                  <a
                    className="a-select"
                    onClick={() => {
                      setSearchTerm("");

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

                      history.push(`/discussion/${data[0]}`);
                    }}
                  >
                    <div>{data[0]}</div>

                    {/* {data[0]} */}
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
                {/* </div> */}
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>


      <div className="main-container">
      <div className="portfolio">
            <div className="portfolio-name">
              Watchlist

     <div onClick={(e) => setEditPortfolio(!showEditPortfolio)} className="comment-icon-container">
      <img className="edit-icon" src="https://img.icons8.com/ios/50/000000/more.png"/>
      </div>
              </div>
            <div>


        <Main key={user.id} showEditPortfolio={showEditPortfolio} />
            </div>
      </div>
      {isLoaded && (

          <div className="profile-container-top">
            <div className="top-profile">
                <div className="prof-pic-top">
                <img
                      className="profile-picture-on-button-page"
                      src={userProf.profile_picture}
                    ></img>
                </div>
                <div className="top-profile-right">
                        <div className="top-profile-username">
                        {userProf.username}
                        </div>
                        {user.id == userProf.id && (

                            <div className="edit-profile-button">
                        <button
                className='login-splash-button-modal'
                onClick={() => setShowModal(true)}
                style={prop ? hideButtonStyle : null}
                >
                Edit Profile
            </button>
            {showModal && (
                <ModalAuth onClose={() => setShowModal(false)}>
                    <EditProfileForm userToEdit={user} showModal={setShowModal} />
                </ModalAuth>
            )}

                        </div>
                    )}
                </div>
            </div>




            {userProf.bio.length > 0 &&(
                <>
                <div className="about-user">
                    About {userProf.username}:
                    </div>
                {userProf.bio}
                </>
            )}
                <div className="profile-container-follower">
                        <div className="following-container">
                            {userProf.following.length} Following
                        </div>
                        <div className="follower-container">
                            {userProf.followers.length} Followers
                        </div>
                </div>
                <div className="comment-feed-profile">
                    <div className="comment-title">
                       {userProf.username}'s Comments

                        </div>
                {userProf.comments && (
            <>
            {userProf.comments.map((comment) => (
                <>
            <div className="link-to-discuss">
                <div>

            Discussion:
                </div>
                <div>

              <a className="profile-a" href={`/discussion/${comment.discussion_ticker}`}>
               {comment.discussion_ticker}
                  </a>
                </div>
            </div>

              <div className="comment-container">
              <div className="comment-body-div-prof-pic">
                <img className="comment-body-prof-pic" src={comment.user.profile_picture}></img>
              </div>
              <div className="comment-body-container">
              <div className="comment-body-first-row">
              <div className="username-posted">
                <div className="comment-top-row-username">
                {comment.user.username} {comment.profile_time}
                </div>
                <div className="comment-top-row-updated">
                {/* {updatedDateFormatted.toLocaleDateString()} */}
                </div>
              </div>

              </div>
              <div className="comment-body-comment">
                    {comment.comment}
              </div>

              <div className="comment-body-bottom-row">
                <div>

              <div className="comment-icon-container">

                {/* <div>

              <img className="comment-icon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-comment-chat-flatart-icons-outline-flatarticons-1.png"/>
                </div>
                <div>
                {comment.replies.length}
            </div> */}
                  {/* <div className="comment-icon-container-like">
                       <div>
                       <img className="comment-like-pic" src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-heart-miscellaneous-kiranshastry-lineal-color-kiranshastry.png"/>
                         </div>
                         <div>
            {comment.likes.length}
              </div>
                  </div> */}
              </div>
              </div>
              </div>
              </div>
              </div>
                </>
              ))}
              </>

              )}
                </div>


        </div>
                )}
               </div>
    </>
  );
};

export default MyProfile;
