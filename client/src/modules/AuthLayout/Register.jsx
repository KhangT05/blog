import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { register as registerServices } from '@/services/AuthServices';
import { Eye, EyeOff } from 'lucide-react';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const auth = await registerServices(data);
      if (auth) {
        navigate('/login');
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible)
  }
  return (
    <>
      <div className='!bg-[#fff] rounded-3xl w-[350px] p-6'>
        <div className='text-center mb-5'>
          <h3 className='text-[28px] font-semibold text-[#333]'>Đăng ký</h3>
          <p className='text-[#aaa] text-base'>Đã tồn tại tài khoản,
            <Link to={'/auth/login'} className='text-[#0e0d0d] font-semibold hover:text-[#667eea]'>
              đăng nhập tại đây
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <input
              type='text'
              className='w-full px-3 py-2 border-2 border-[#e1e5e9] rounded-lg text-base bg-white placeholder:text-[#999]'
              name='name'
              placeholder='Nhập tên đăng nhập'
              {...register('name', {
                required: 'Vui lòng nhập tên đăng nhập.',
                minLength: {
                  value: 6,
                  message: 'Tên đăng nhập phải có ít nhất 6 ký tự.',
                },
              })}
            />
            {errors.name && <p className='text-xs text-[#e74c3c] mt-1' style={{ color: 'red' }}>
              {errors.name.message}
            </p>}
          </div>
          <div className='mb-[15px] relative'>
            <input
              type='email'
              className='w-full px-3 py-2 border-2 border-[#e1e5e9] rounded-lg text-base bg-white placeholder:text-[#999]'
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
            {errors.email && <p className='text-xs text-[#e74c3c] mt-1' style={{ color: 'red' }}>
              {errors.email.message}
            </p>}
          </div>
          <div className='mb-[15px] relative'>
            <input
              type={!isVisible ? "password" : "text"}
              className='w-full px-3 py-2 border-2 border-[#e1e5e9] rounded-lg text-base bg-white placeholder:text-[#999]'
              name='password'
              placeholder='Nhập mật khẩu'
              {...register('password', {
                required: 'Vui lòng nhập mật khẩu',
                minLength: {
                  value: 8,
                  message: 'Mật khẩu phải có ít nhất 8 ký tự.'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: 'Mật khẩu phải có ít nhất 1 chữ in hoa và 1 số.'
                }
              })}
            />
            <span onClick={toggle} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
              {isVisible ? <Eye /> : <EyeOff />}
            </span>
            {errors.password &&
              <p className='text-xs text-[#e74c3c] mt-1' style={{ color: 'red' }}>{errors.password.message}</p>}
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='w-full py-[14px] px-5 bg-[#c2bfb5] rounded-lg text-base font-semibold cursor-pointer mb-[10px] border-none hover:shadow-[0_4px_12px_rgba(83,93,142,0.3)] hover:bg-[#667eea] hover:text-white'
              disabled={isLoading}>
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register