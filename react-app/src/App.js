import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import LoginFormModal from './components/auth/LoginFormModal';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Main from './components/Main'
import StockDiscussion from './components/StockDiscussion.js';
import NavigationBar from './components/NavigationBar';
import Splash from './components/Splash';
import LandingPage from './components/LandingPage';
import MyProfile from './components/MyProflie';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  // const user = useSelector((state) => state.session.user);


    return (
    <BrowserRouter>

      <Switch>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>

        <ProtectedRoute path='/home' exact={true} >
          <Splash />
        </ProtectedRoute>
        <ProtectedRoute path='/my-profile' exact={true} >
          <MyProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/discussion/:ticker" exact={true}>
      <NavigationBar />
        </ProtectedRoute>
        <Route path="">
          <h1>Page Not Found</h1>
          <a href="/">Return Home</a>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
