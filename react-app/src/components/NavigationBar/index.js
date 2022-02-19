
import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import SearchBar from '../Search';
import './navigation.css'
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';

const NavigationBar = () => {
    const user = useSelector((state) => state.session.user);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();


    const openProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu)
    }

    const handleLogout = async () => {
        await dispatch(sessionActions.logout());

        history.push('/login');
      };

  return (
      <div className='nav-container'>

    <nav className='navbar'>

            <a href={`/home`}className='tradetwits-title'>
        TradeTwits
            </a>
            <div>
                Rooms
                Shows
                Rankings
                Earnings
                Newsletters
                Shop
            </div>
        <div>
      <SearchBar />
        </div>
        {user && (
            <>
            <div>
                <button className='profile-button' onClick={openProfileMenu}>
                    <img className='profile-picture-on-button' src={user.profile_picture}></img>
                </button>
            profile button
        </div>
        {showProfileMenu && (
        <ul className="profile-dropdown">
          <div className="username__container">
            <li className="Dd-username">Welcome, {user?.username}</li>
          </div>
          <div className="email__container">
            <li className="Dd-email">Email: {user?.email}</li>
          </div>
          <div className="my__profile__container" >
          <img src={user.profile_picture} />

            <NavLink to={'/my-profile'} className="my__profile"> Profile</NavLink>
          </div>
          {user ? <button className="logout-btn" onClick={handleLogout}>Sign Out</button> : null}
        </ul>
      )}
        <div>
            Post
        </div>
            </>
            )}

    </nav>
    <div className='trending-container'>
        <div className='three'>
        <div>
    Dow
        </div>

        <div>
            SAP
        </div>
        <div>
            Nasdaq
        </div>

        </div>
        <div className='feed'>
            <div>
            feed
            </div>

        </div>
    </div>
      </div>
  );
}

export default NavigationBar;
