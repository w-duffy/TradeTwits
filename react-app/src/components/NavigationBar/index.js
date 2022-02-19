
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
        await setShowProfileMenu(!showProfileMenu)
        await history.push('/login');
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
        <div className='search-bar-div'>
      <SearchBar />
        </div>
        {user && (
            <>
            <div className='profile-container'>

            <div>
                <div className='profile-button' onClick={openProfileMenu}>
                    <img className='profile-picture-on-button' src={user.profile_picture}></img>
                </div>
        </div>
        {showProfileMenu && (
        <ul className="profile-ul">

            <li className="profile-li"><a className='profile-a' href="/my-profile">Profile</a></li>


            <li className="profile-li"><a className='profile-a' href="/my-profile">Edit Profile</a></li>


          <li className='profile-li'><a className='profile-a' href="#" onClick={handleLogout}>Sign Out</a></li>

        </ul>
      )}
      </div>
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
