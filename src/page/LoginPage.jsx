import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(false);
  const history = useHistory();

  const validUsername = import.meta.env.VITE_USERNAME;
  const validPassword = import.meta.env.VITE_PASSWORD;

  const onSubmit = data => {
    const { username, password } = data;

    if (username === validUsername && password === validPassword) {
      setLoginError(false);
      history.push('/blank-page');
    } else if (username === validUsername) {
      setLoginError(true);
    }
  };

  return (
    <>
    <div className='login-container'>
      <div className='login-box'>
        <div className="logo">
          <img src="/shopping-cart.png" alt="User Logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input-container'>
            <img src="/user.png" alt="User Logo" className="input-icon" />
            <input 
              type="text"
              placeholder='USERNAME'
              className='form-input'
              {...register('username', { required: true })} 
              />
          </div>
          {errors.username && <span className="error-message">Username is required</span>}
          <div className='input-container'>
            <img src="/lock.png" alt="Lock Logo" className="input-icon" />
            <input
              type="password"
              placeholder="PASSWORD"
              className="form-input"
              {...register('password', {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
              })}
            />
          </div>
          {errors.password && errors.password.type === 'required' && <span className="error-message">Password is required</span>}
            {errors.password && errors.password.type === 'pattern' && <span className="error-message">Wrong combination</span>}
          <div className='login-button-box'>
            <button type="submit" className="login-button">LOGIN</button>
            <a href="#" className="forgot-password">Forgot password?</a>
            {loginError && <div className="popup-error">The provided password is wrong!</div>}
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginPage