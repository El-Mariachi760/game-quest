import React, { useState } from "react";
import ReactDOM from "react-dom";
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER} from '../../utils/mutations';


function LoginForm() {
  // React States
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: ''
    });
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" id="password" value={formState.password} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}
export default LoginForm;