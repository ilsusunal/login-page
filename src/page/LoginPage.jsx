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

  const closePopup = () => {
    setLoginError(false);
  };

  return (
    <>
    <main className='main-container'>
    <img src="/BG.svg" alt="background image" className="bg-image wave"/>
    <div className='login-container'>
      <div className='login-box'>
        <div className="logo">
          <img src="/form-logo.svg" alt="Form Logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input-container'>
            <img src="/user-icon.svg" alt="User Icon" className="input-icon" />
            <input 
              type="text"
              placeholder='USERNAME'
              className='form-input'
              {...register('username', { 
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
              })} 
              />
          </div>
          {errors.username &&  errors.username.type === 'required' && <span className="error-message">Username is required.</span>}
          {errors.username &&  errors.username.type === 'pattern' && <span className="error-message">Not a valid email!</span>}
          <div className='input-container'>
            <img src="/lock-icon.svg" alt="Lock Icon" className="input-icon" />
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
          {errors.password && errors.password.type === 'required' && <span className="error-message">Password is required.</span>}
          {errors.password && errors.password.type === 'pattern' && <span className="error-message">Wrong combination!</span>}
          <div className='login-button-box'>
            <button type="submit" className="login-button">LOGIN</button>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
      {loginError && (
        <div className="popup-overlay">
          <div className="popup">
            <button onClick={closePopup} className="close-popup-button">X</button>
            <p>The provided password is wrong!</p>
          </div>
        </div>
      )}
    </main>
    </>
  )
}

export default LoginPage