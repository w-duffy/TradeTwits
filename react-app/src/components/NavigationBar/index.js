
import React from 'react';
import SearchBar from '../Search';
import './navigation.css'
const NavigationBar = () => {
  return (
      <div className='nav-container'>

    <nav className='navbar'>

            <div>
        Home
            </div>
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
        <div>
            profile button
        </div>
        <div>
            Post
        </div>

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
