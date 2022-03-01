import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './myProfile.css'
import { editUserProfile } from '../../store/session';
import { Oval } from  'react-loader-spinner'


const EditProfileForm = ({userToEdit, showModal}) => {
  const [errors, setErrors] = useState([]);
  const [bio, setBio] = useState(userToEdit.bio);
  const [profPic, setProfPic] = useState(userToEdit.profile_picture);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [landingLoader, setLandingLoader] = useState(false)


  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfPic(e.target.value);
  };



  const handleEditProfile = async (e) => {
    e.preventDefault();
    let id = userToEdit.id;
    let newBio = bio;
    let newProfilePic = profPic;

    let errArr = []
        if(newBio.length < 1){
            errArr.push("You cannot submit a blank bio")
          }

    if(newProfilePic.length < 1){
      errArr.push("You cannot submit a blank profile picture")
    }

    if(typeof newProfilePic !== 'string'){
        errArr.push("This is not a valid image link")
      }

      if (newProfilePic.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) === null){
        errArr.push("This link format is not compatible with TradeTwits.  Try using a jpg, jpeg, or png")
      }

    if(errArr.length){
      return setErrors(errArr)
    }
    await setLandingLoader(true)
    await dispatch(editUserProfile(id, newBio, newProfilePic));
    await setLandingLoader(false)
    showModal(false)
  };





  return (
    <>
       {!landingLoader && (
         <>
    <div className='login-modal-title'>
      Edit Profile
    </div>
    <form onSubmit={handleEditProfile}>
      <div className="error-login">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div>
        <label htmlFor='bio'>Input your new bio below</label>
        <input
          className='login-modal-input'
          name='bio'
          type='text'
          placeholder='bio'
          value={bio}
          onChange={updateBio}
        />
      </div>
      <div>
        <label htmlFor='profile-picture'>Input your new profile picture below</label>
        <input
          className='login-modal-input'
          name='profile-picture'
          type='profile-picture'
          placeholder='profile-picture'
          value={profPic}
          onChange={updateProfilePic}
          />
        <div className='modal-login-button-container'>

        <button className='login-splash-button-modal' type='submit'>Submit</button>
        </div>
      </div>
    </form>
    </>
          )}
                    {landingLoader && (
            <>
            <div className='login-modal-loader'>
              Updating your bio..
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

export default EditProfileForm;
