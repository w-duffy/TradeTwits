import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'
import { Oval } from  'react-loader-spinner'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const [landingLoader, setLandingLoader] = useState(false)

  const onLogin = async (e) => {
    e.preventDefault();
    let errArr = []
    if(!email){
      errArr.push("You must enter an email")
    }
    if(!password){
      errArr.push("You must enter a password")
    }

    if(errArr.length){
      return setErrors(errArr)
    }
    await setLandingLoader(true)
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      await setLandingLoader(false)
    } else {
      history.push("/home")
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
    {!landingLoader && (
      <>
      <div className='login-modal-title'>
      Log In
    </div>
    <form onSubmit={onLogin}>
      <div className="error-login">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div>
        <label htmlFor='email'></label>
        <input
          className='login-modal-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          />
      </div>
      <div>
        <label htmlFor='password'></label>
        <input
          className='login-modal-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          />
        <div className='modal-login-button-container'>

        <button className='login-splash-button-modal' type='submit'>Log In</button>
        </div>
      </div>



    </form>
    </>
      )}
          {landingLoader && (
            <>
            <div className='login-modal-loader'>
              Loading latest stock data..
            </div>
          <div className='login-modal-loader'>
            <div>

          <Oval color="#00BFFF" height={50} width={50} />
              </div>
          </div>
            </>
            )}
    </>
  );
};

export default LoginForm;
