import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(false);

  const validUsername = import.meta.env.VITE_USERNAME;
  const validPassword = import.meta.env.VITE_PASSWORD;

  const onSubmit = data => {
    const { username, password } = data;

    if (username === validUsername && password === validPassword) {
      setLoginError(false);
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
          <input 
          type="text"
          placeholder='USERNAME'
          className='form-input'
          {...register('username', { required: true })} 
          />
          {errors.username && <span className="error-message">Username is required</span>}
          <input
            type="password"
            placeholder="PASSWORD"
            className="form-input"
            {...register('password', {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            })}
          />
          {errors.password && errors.password.type === 'required' && <span className="error-message">Password is required</span>}
          {errors.password && errors.password.type === 'pattern' && <span className="error-message">Wrong combination</span>}
          <div className='login-button-box'>
            <button type="submit" className="login-button">LOGIN</button>
            <p>Forgot password?</p>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginPage