import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginFormModal  from './LoginFormModal'
import SignUpModal from './SignUpFormModal';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/' />}
      {/* <LoginFormModal />
      <SignUpModal /> */}
    </Route>
  )
};


export default ProtectedRoute;
