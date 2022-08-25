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
          <input type="email" name="email" id="email" placeholder="Email" value={formState.email} onChange={handleChange} required />
        </div>
        <div className="input-container">
          <input type="password" name="password" id="password" placeholder="Password"value={formState.password} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <button className='login-btn' type='submit'>Login</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <h2 className="title">Sign In</h2>
        {renderForm}
      </div>
    </div>
  );
}
export default LoginForm;