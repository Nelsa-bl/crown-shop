// Import Usecontext
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';

// Import Sign out
import { signOutUser } from '../../utils/firebase/firebase.utils';

// Import component
import Button from '../../components/button/button.component';

// Import styles
import './profile.style.scss';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/auth');
  }, [currentUser]);

  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Profile</h2>
          <div className='profile-image'>
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt={currentUser.displayName} />
            ) : (
              <div className='noProfileImg'>
                <span className='noProfileImgName'>
                  {currentUser.displayName.slice(0, 1).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className='profile-container'>
            <div className='profile-item'>
              <label>User name:</label>
              <p>{currentUser.displayName}</p>
            </div>
            <div className='profile-item'>
              <label>Email:</label>
              <p>{currentUser.email}</p>
            </div>
            <div className='profile-item'>
              <label>Last signed in time:</label>
              <p className='cursive'>{currentUser.metadata.lastSignInTime}</p>
            </div>
            <br />
            <Button onClick={signOutUser}>SIGN OUT</Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
