import requestApi from '@/config/axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
// import { setUser } from '@/redux/slice/authSlice';
import { useForm } from 'react-hook-form';
import { setMessage } from '@/redux/slice/toastSlice';
import './Register.css'
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isAuthenticated } = useSelector(state => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])
  const onSubmit = async (data) => {
    try {
      const response = await requestApi("/accout/login", "POST", data);
      const resData = response.data?.data;
      localStorage.setItem('accessToken', response.data.token.accessToken)
      if (resData.success && resData.user) {
        // dispatch(setUser({ user: resData.user }));
        dispatch(setMessage({ type: 'success', message: 'Đăng nhập thành công.' }));
        navigate('/');
      } else {
        dispatch(setMessage({ type: 'error', message: 'Đăng nhập thất bại. Vui lòng thử lại.' }))
      }
    } catch (error) {
      dispatch(setMessage({ type: 'error', message: 'Có lỗi khi đăng nhập' }))
    }
  }
  return (
    <>
      <div className='login-header'>
        <h3 className='login-header__title'>Đăng nhập</h3>
        <p className='login-header__subtitle'>Nếu bạn chưa có tài khoản,
          <Link to={'account/register'} className='text-[#f1c40f]'> đăng ký ngay</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-field'>
          <label className='form-field__label'>Email</label>
          <input
            type='email'
            className='form-field__input'
            name='email'
            placeholder='Nhập email'
            {...register('email', {
              required: 'Vui lonfg nhập email.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Nhập email sai định dạng.',
              }
            })}
          />
          {errors.email && <p className='' style={{ color: 'red' }}>
            {errors.email.message}
          </p>}
        </div>
        <div className='form-field'>
          <label className='form-field__label'>Mật khẩu</label>
          <input
            type='password'
            className='form-field__input'
            name='password'
            placeholder='Nhập mật khẩu'
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu'
            })}
          />
          {errors.password && <p className='form-field__error' style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <div className='form-footer'>
          <button
            type='submit'
            className='submit-btn'>
            Đăng nhập
          </button>
          <div className='forgot-password__link'>
            <Link to={'auth/forgot-password'}>Quên mật khẩu?</Link>
          </div>
        </div>
      </form>
    </>
  )
}

export default Register