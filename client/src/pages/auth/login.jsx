import requestApi from '@/helper/axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '@/redux/slice/authSlice';
import { useForm } from 'react-hook-form';
import { setMessage } from '@/redux/slice/toastSlice';
const Login = () => {
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
      const response = await requestApi("/auth/login", "POST", data);
      const resData = response.data?.data;
      localStorage.setItem('accessToken',response.data.token.accessToken)
      if (resData.success && resData.user) {
        dispatch(setUser({ user: resData.user }));
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
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg'>
      <div className='text-center text-sky-600 font-bold mb-6'>Đăng nhập</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-4'>
          <label className='text-lg font-bold mb-2 text-gray-600'>Email</label>
          <input
            type='email'
            className='p-2 border rounded-sm border-gray-300'
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
          {errors.email && <p className='font-medium' style={{ color: 'red' }}>
            {errors.email.message}
          </p>}
        </div>
        <div className='flex flex-col mb-4'>
          <label className='text-lg font-bold mb-2 text-gray-600'>Mật khẩu</label>
          <input
            type='password'
            className='p-2 border rounded-sm border-gray-300'
            name='password'
            placeholder='Nhập mật khẩu'
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu'
            })}
          />
          {errors.password && <p className='font-medium' style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <div className='flex justify-between mb-4'>
          <span> <input type='checkbox' /> Ghi nhớ mật khẩu</span>
          <Link>Quên mật khẩu?</Link>
        </div>
        <button
          type='submit'
          className='w-full font-medium bg-sky-500 hover:bg-sky-600 rounded px-4 py-2 mb-2'>
          Đăng nhập
        </button>
      </form>
      <div className='text-center'>
        <p className='text-gray-600'>Chưa có tài khoản?
          <Link to={'/auth/register'} className='text-sky-400'> Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login