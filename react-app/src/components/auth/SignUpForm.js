import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Oval } from  'react-loader-spinner'
import './login.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [landingLoader, setLandingLoader] = useState(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    let errArr = []
    setErrors("")
    if(!username){
      errArr.push("You must enter a username")
    }
    if(!email){
      errArr.push("You must enter an email")
    }
    if(!email.includes('@')){
      errArr.push("You must enter a valid email")
    }
    if(email.length < 3){
      errArr.push("You must enter a valid email")
    }
    if(!password){
      errArr.push("You must enter a password")
    }

    if(!repeatPassword){
      errArr.push("You must enter your password again")
    }

    if(password !== repeatPassword){
      errArr.push("Your passwords do not match")
    }
    if(errArr.length){
      return setErrors(errArr)
    }

    if (password === repeatPassword) {
      await setLandingLoader(true)
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        await setLandingLoader(false)
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    {!landingLoader && (
      <>
      <div className='login-modal-title'>
      Join TradeTwits.  It's Free!
    </div>
    <form onSubmit={onSignUp}>
      <div className="error-login">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div>
        <label></label>
        <input
        className='login-modal-input'
        type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label></label>
        <input
        className='login-modal-input'
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label></label>
        <input
        className='login-modal-input'
        type='password'
        name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          ></input>
      </div>
      <div>
        <label></label>
        <input
        className='login-modal-input'
          type='password'
          name='repeat_password'
          placeholder='Repeat Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ></input>
      </div>
      <div className='modal-login-button-container'>
      <button className='login-splash-button-modal' type='submit'>Sign Up</button>
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

export default SignUpForm;
