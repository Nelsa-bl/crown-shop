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

  return (
    <div className='authentication-container'>
      {/* Sign in form*/}
      <SignInForm />
      {/* Sign up form */}
      <SignUpForm />
    </div>
  );
};

export default Authentication;
