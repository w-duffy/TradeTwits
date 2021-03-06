import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../NavigationBar/navigation.css";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import { searchOptions, tickers } from "../Search/tickers";
import { createBrowserHistory } from "history";
import Main from "../Main";
import "../Splash/splash.css";
import "./myProfile.css";
import { ModalAuth } from "../../Context/ModalAuth";
import EditProfileForm from "./EditProfile";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { addNewFollower, deleteNewFollower } from "../../store/followers";

const MyProfile = ({ prop = false }) => {
  const user = useSelector((state) => state.session.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const refHandler = useRef(null);
  const refHandlerSplash = useRef(null);
  const [showEditPortfolio, setEditPortfolio] = useState(false);
  const [showModal, setShowModal] = useState(prop);
  const { userId } = useParams();

  const hideButtonStyle = {
    display: "none",
  };

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
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [searchTermSplash, setSearchTermSplash] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsSplash, setSearchResultsSplash] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const browserHistory = createBrowserHistory();
  const [isDiscussionLoaded, setIsDiscussionLoaded] = useState(false);
  const [isFollowersLoaded, setIsFollowersLoaded] = useState(false);
  const [isFollowerUpdated, setIsFollowerUpdated] = useState(false);

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
    if (
      refHandlerSplash.current &&
      !refHandlerSplash.current.contains(event.target)
    ) {
      setSearchTermSplash("");
    }
  };

  const trendingStocks = Object.entries(user.trending);
  const filterArrStocks = trendingStocks.filter((stock) => {
    return tickers.includes(stock[0]);
  });
  const feedData = filterArrStocks.slice(0, 5);

  const handleAddFollow = async (e, id) => {
    e.preventDefault();
    let userToFollowId = userProf.id;
    let user_id = user.id;

    let currentlyFollowed = user.following.filter((follow) => {
      return follow.user_id === userToFollowId;
    });
    setIsFollowerUpdated(true);
    if (currentlyFollowed.length === 0) {
      await dispatch(addNewFollower(userToFollowId, user_id));
      const res = await fetch(`/api/follower/${userId}`);
      const my_followers = await res.json();
      await setUserFollowers(my_followers);
      await setIsFollowerUpdated(false);
    }

    if (currentlyFollowed.length > 0) {
      let followId = currentlyFollowed[0].id;

      await dispatch(deleteNewFollower(followId, user_id, userToFollowId));
      const res = await fetch(`/api/follower/${userId}`);
      const my_followers = await res.json();
      await setUserFollowers(my_followers);
      await setIsFollowerUpdated(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      await setIsDiscussionLoaded(true);
      const response = await fetch(`/api/users/${userId}`);
      const user2 = await response.json();
      setUserProf(user2);
      setIsLoaded(!isLoaded);
      await setIsDiscussionLoaded(false);
    })();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    (async () => {
      await setIsFollowersLoaded(true);
      const res = await fetch(`/api/follower/${userId}`);
      const my_followers = await res.json();
      await setUserFollowers(my_followers);
      await setIsFollowersLoaded(false);
    })();

    (async () => {
      await setIsFollowersLoaded(true);
      const res = await fetch(`/api/follower/following/${userId}`);
      const my_following = await res.json();
      if (my_following.error) {
        window.alert("User does not exist");
        history.push("/home");
      }
      await setUserFollowing(my_following);
      await setIsFollowersLoaded(false);
    })();
  }, [dispatch]);

  let isFollower = user.following.map((follow) => {
    return follow.user_id;
  });

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
                      alt="profile-pic"
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
                      <a className="profile-a" href="/" onClick={handleLogout}>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="portfolio">
          <div className="port-border">
            <div className="portfolio-name">
              Watchlist
              <div
                onClick={(e) => setEditPortfolio(!showEditPortfolio)}
                className="comment-icon-container"
              >
                <img
                  className="edit-icon"
                  alt="edit-pic"
                  src="https://img.icons8.com/ios/50/000000/more.png"
                />
              </div>
            </div>
            <div>
              <Main key={user.id} showEditPortfolio={showEditPortfolio} />
            </div>
          </div>
        </div>
        {isDiscussionLoaded && (
          <div className="landing-page-spinner">
            <div className="loading-text">Loading profile data...</div>
            <div>
              <Oval color="#00BFFF" height={100} width={100} />
            </div>
          </div>
        )}

        {isLoaded && !isDiscussionLoaded && userProf.id === user.id && (
          <div className="profile-container-top">
            <div className="top-profile">
              <div className="prof-pic-top">
                <img
                  className="profile-picture-on-button-page"
                  alt="profile-pic"
                  src={user.profile_picture}
                ></img>
              </div>
              <div className="top-profile-right">
                <div className="top-profile-username">{user.username}</div>
                {user.id && (
                  <div className="edit-profile-button">
                    <button
                      className="login-splash-button-modal"
                      onClick={() => setShowModal(true)}
                      style={prop ? hideButtonStyle : null}
                    >
                      Edit Profile
                    </button>
                    {showModal && (
                      <ModalAuth onClose={() => setShowModal(false)}>
                        <EditProfileForm
                          userToEdit={user}
                          showModal={setShowModal}
                        />
                      </ModalAuth>
                    )}
                  </div>
                )}
              </div>
            </div>

            {user.bio.length > 0 && (
              <>
                <div className="about-user">About {user.username}:</div>
                {user.bio}
              </>
            )}
            <div className="comment-feed-profile">
              <div className="comment-title">{user.username}'s Comments</div>
              {user.comments && (
                <>
                  {user.comments.map((comment) => (
                    <>
                      <div className="link-to-discuss">
                        <div>Discussion:</div>
                        <div>
                          <a
                            className="profile-a"
                            href={`/discussion/${comment.discussion_ticker}`}
                          >
                            {comment.discussion_ticker}
                          </a>
                        </div>
                      </div>

                      <div className="comment-container">
                        <div className="comment-body-div-prof-pic">
                          <img
                           alt="profile-pic"
                            className="comment-body-prof-pic"
                            src={comment.user.profile_picture}
                          ></img>
                        </div>
                        <div className="comment-body-container">
                          <div className="comment-body-first-row">
                            <div className="username-posted">
                              <div className="comment-top-row-username">
                                {comment.user.username}
                              </div>
                              <div className="comment-top-row-updated">
                                {comment.profile_time}
                              </div>
                            </div>
                          </div>
                          <div className="comment-body-comment-c">
                            {comment.comment}
                          </div>

                          <div className="comment-body-bottom-row">
                            <div>
                              <div className="comment-icon-container"></div>
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

        {isLoaded && !isDiscussionLoaded && user.id !== userProf.id && (
          <div className="profile-container-top">
            <div className="top-profile">
              <div className="prof-pic-top">
                <img
                  alt="profile-pic"
                  className="profile-picture-on-button-page"
                  src={userProf.profile_picture}
                ></img>
              </div>
              <div className="top-profile-right">
                <div className="top-profile-username">{userProf.username}</div>
                {user.id !== userProf.id && (
                  <>
                    {isFollower.includes(userProf.id) && (
                      <div className="edit-profile-button">
                        <button
                          className="login-splash-button-modal"
                          onClick={(e) => handleAddFollow(e)}
                        >
                          Unfollow
                        </button>

                        {isFollowerUpdated && (
                          <div className="update-follow-spinner">
                            <Oval color="#00BFFF" height={25} width={25} />
                          </div>
                        )}
                      </div>
                    )}

                    {!isFollower.includes(userProf.id) && (
                      <div className="edit-profile-button">
                        <button
                          className="login-splash-button-modal"
                          onClick={(e) => handleAddFollow(e)}
                        >
                          Follow
                        </button>
                        {isFollowerUpdated && (
                          <div className="update-follow-spinner">
                            <Oval color="#00BFFF" height={25} width={25} />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {userProf.bio.length > 0 && (
              <>
                <div className="about-user">About {userProf.username}:</div>
                {userProf.bio}
              </>
            )}
            <div className="comment-feed-profile">
              <div className="comment-title">
                {userProf.username}'s Comments
              </div>
              {userProf.comments && (
                <>
                  {userProf.comments.map((comment) => (
                    <>
                      <div className="link-to-discuss">
                        <div>Discussion:</div>
                        <div>
                          <a
                            className="profile-a"
                            href={`/discussion/${comment.discussion_ticker}`}
                          >
                            {comment.discussion_ticker}
                          </a>
                        </div>
                      </div>

                      <div className="comment-container">
                        <div className="comment-body-div-prof-pic">
                          <img
                          alt="profile-pic"
                            className="comment-body-prof-pic"
                            src={comment.user.profile_picture}
                          ></img>
                        </div>
                        <div className="comment-body-container">
                          <div className="comment-body-first-row">
                            <div className="username-posted">
                              <div className="comment-top-row-username">
                                {comment.user.username}
                              </div>
                              <div className="comment-top-row-updated">
                                {comment.profile_time}
                              </div>
                            </div>
                          </div>
                          <div className="comment-body-comment-c">
                            {comment.comment}
                          </div>

                          <div className="comment-body-bottom-row">
                            <div>
                              <div className="comment-icon-container"></div>
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
        {isFollowersLoaded && (
          <div className="landing-page-spinner">
            <div className="loading-text">Loading followers...</div>
            <div>
              <Oval color="#00BFFF" height={100} width={100} />
            </div>
          </div>
        )}
        <div>
          <>
            {isLoaded && !isFollowersLoaded && user.id !== userProf.id && (
              <>
                <div className="news-border-t">
                  <div>Followers: {userFollowers.length}</div>
                  {userFollowers.map((follower) => (
                    <div
                      className="follower-container-right"
                      onClick={() =>
                        (window.location.href = `/profile/${follower.id}`)
                      }
                    >
                      <div>
                        <img
                        alt="comment-pic"
                          className="comment-body-prof-pic"
                          src={follower.profile_picture}
                        ></img>
                      </div>
                      <div className="follower-username">
                        {follower.username}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
          <>
            {isLoaded && !isFollowersLoaded && user.id === userProf.id && (
              <>
                <div className="news-border-t">
                  <div>Followers: {user.followers.length}</div>
                  {userFollowers.map((follower) => (
                    <div
                      className="follower-container-right"
                      onClick={() =>
                        (window.location.href = `/profile/${follower.id}`)
                      }
                    >
                      <div>
                        <img
                        alt="prof-pic"
                          className="comment-body-prof-pic"
                          src={follower.profile_picture}
                        ></img>
                      </div>
                      <div className="follower-username">
                        {follower.username}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>

          <div>
            <>
              {isLoaded && !isFollowersLoaded && user.id !== userProf.id && (
                <>
                  <div className="news-border-r">
                    <div className="following-container">
                      Following: {userProf.following.length}
                    </div>
                    {userFollowing.map((follower) => (
                      <div
                        className="follower-container-right"
                        onClick={() =>
                          (window.location.href = `/profile/${follower.id}`)
                        }
                      >
                        <div>
                          <img
                          alt="prof-pic"
                            className="comment-body-prof-pic"
                            src={follower.profile_picture}
                          ></img>
                        </div>
                        <div className="follower-username">
                          {follower.username}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
            <>
              {isLoaded && !isFollowersLoaded && user.id === userProf.id && (
                <>
                  <div className="news-border-r">
                    <div className="following-container">
                      Following: {user.following.length}
                    </div>
                    {userFollowing.map((follower) => (
                      <div
                        className="follower-container-right"
                        onClick={() =>
                          (window.location.href = `/profile/${follower.id}`)
                        }
                      >
                        <div>
                          <img
                          alt="prof-pic"
                            className="comment-body-prof-pic"
                            src={follower.profile_picture}
                          ></img>
                        </div>
                        <div className="follower-username">
                          {follower.username}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
