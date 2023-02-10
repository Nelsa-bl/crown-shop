// Import Usecontext
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

// Link
import { Link } from 'react-router-dom';

// Import component
import Button from '../../components/button/button.component';

// Import styles
import './profile.style.scss';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Profile</h2>
          <div className='profile-image'>
            <img src={currentUser.photoURL} alt={currentUser.displayName} />
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
          </div>
        </div>
      ) : (
        <div className='center'>
          <p>You must login to use this page.</p>
          <Link
            style={{ justifyContent: 'center', display: 'flex' }}
            to='/auth'
          >
            <Button>Sign in</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
