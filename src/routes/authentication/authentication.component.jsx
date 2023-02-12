import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';

// Import components
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

// Import style
import './authentication.style.scss';

const Authentication = () => {
  // // Connect to firebase via Google Mail Redirect Auth
  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log({ user });
  // };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  return (
    <div className='authentication-container'>
      {!currentUser ? (
        <div>
          <div className='tabs'>
            <div
              className={`tab ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => handleTabClick(0)}
            >
              SIGN IN
            </div>
            <div
              className={`tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => handleTabClick(1)}
            >
              SIGN UP
            </div>
          </div>
          <div className='tab-content'>
            {activeTab === 0 && (
              <div>
                <SignInForm />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <SignUpForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Authentication;
