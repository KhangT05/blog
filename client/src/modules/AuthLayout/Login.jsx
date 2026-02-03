import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { setLogin } from '@/redux/slice/authSlice';
import { login } from '@/services/AuthServices';
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
      <div className='bg-white rounded-3xl w-[350] p-6'>
        <div className='text-center mb-5'>
          <h3 className='text-[28px] font-semibold text-[#333]'>Đăng nhập</h3>
          <p className='text-[#aaa] text-base'>Nếu bạn chưa có tài khoản,
            <Link to={'/auth/register'} className='text-[#0e0d0d] font-semibold hover:text-[#667eea]'>
              đăng ký ngay
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3 relative'>
            <input
              type='email'
              className='w-full py-[10px] pr-[40px] pl-3 border-2 border-[#e1e5e9] rounded-lg text-base bg-white placeholder:text-[#999]'
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
            {errors.email && <p className='text-xs text-[#e74c3c] mt-1 mb-0' style={{ color: 'red' }}>
              {errors.email.message}
            </p>}
          </div>
          <div className='mb-[15px] relative'>
            <input
              type={!isVisible ? 'password' : 'text'}
              className='w-full py-[10px] pr-[40px] pl-3 border-2 border-[#e1e5e9] rounded-lg text-base bg-white placeholder:text-[#999]'
              name='password'
              placeholder='Nhập mật khẩu'
              {...register('password', {
                required: 'Vui lòng nhập mật khẩu'
              })}
            />
            <span onClick={toggle} className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'>
              {isVisible ? <Eye /> : <EyeOff />}
            </span>
            {errors.password && <p className='text-xs text-[#e74c3c] mt-1 mb-0' style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='w-full py-[14px] px-5 bg-[#c2bfb5] rounded-lg text-base font-semibold cursor-pointer mb-[10px] hover:shadow-[0_4px_12px_rgba(83,93,142,0.3)] hover:bg-[#667eea] hover:text-white'>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
            <Link to={"/password/rest"} className='hover:text-[#667eea]'>Quên mật khẩu?</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login