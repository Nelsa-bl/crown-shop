// Import from React
import { useState } from 'react';

// Import components
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

// Import style
import './sign-in-form.style.scss';

// Object for input fields
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // Set state
  const [formFields, setFormFields] = useState(defaultFormFields);
  // Destructure
  const { email, password } = formFields;

  // Clear input fields
  const resetFormFileds = () => {
    setFormFields(defaultFormFields);
  };

  // Connect to firebase via Google Mail Popup Auth
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send user info to DB
    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      // Clear input fields
      resetFormFileds();
    } catch (err) {
      // For diffrent errors return diffrent output
      switch (err.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('User does not exist, please sign up');
          break;
        default:
          console.log(err.message);
      }
    }
  };

  // Function for handling state change
  const handleChange = (e) => {
    // Get values
    const { name, value } = e.target;

    // Set values and spread values
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
