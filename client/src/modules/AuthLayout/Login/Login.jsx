import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { setLogin } from '@/redux/slice/authSlice';
import { login } from '@/services/AuthServices';
import './Login.css'
import { Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const auth = await login(data);
      if (auth && auth.user) {
        dispatch(setLogin(auth));
        navigate('/')
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible)
  }
  return (
    <>
      <div className='auth-layout'>
        <div className='auth-layout__card'>
          <div className='login-header'>
            <h3 className='login-header__title'>Đăng nhập</h3>
            <p className='login-header__subtitle'>Nếu bạn chưa có tài khoản,
              <Link to={'/register'} className='text-[#0e0d0d] font-semibold hover:text-[#667eea]'>
                đăng ký ngay
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-field'>
              <input
                type='email'
                className='form-field__input'
                name='email'
                placeholder='Nhập email'
                {...register('email', {
                  required: 'Vui lòng nhập email.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Nhập email sai định dạng.',
                  }
                })}
              />
              {errors.email && <p className='form-field__error' style={{ color: 'red' }}>
                {errors.email.message}
              </p>}
            </div>
            <div className='form-field'>
              <input
                type={!isVisible ? 'password' : 'text'}
                className='form-field__input'
                name='password'
                placeholder='Nhập mật khẩu'
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu'
                })}
              />
              <span onClick={toggle} className='form-field__hide'>
                {isVisible ? <Eye /> : <EyeOff />}
              </span>
              {errors.password && <p className='form-field__error' style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>
            <div className='login-footer'>
              <button
                type='submit'
                className='submit-btn'>
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
              <Link to={"/password/rest"} className='login-password__reset'>Quên mật khẩu?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login