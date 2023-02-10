// Import from React
import { useState } from 'react';

// Import components
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

// Import style
import './sign-up-form.style.scss';

// Object for input fields
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // Set state
  const [formFields, setFormFields] = useState(defaultFormFields);
  // Destructure
  const { displayName, email, password, confirmPassword } = formFields;

  // Clear input fields
  const resetFormFileds = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Send user info to DB
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Create user documnet
      await createUserDocumentFromAuth(user, { displayName });

      // Clear input fields
      resetFormFileds();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Can not create user, email already in use.');
      } else {
        console.log('Error when creating user', err.message);
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
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

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

        <label htmlFor=''></label>
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
