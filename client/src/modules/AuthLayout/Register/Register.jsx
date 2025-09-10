import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import './Register.css'
import { register as registerServices } from '@/services/AuthServices';
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
  return (
    <>
      <div className='auth-layout'>
        <div className='auth-layout__card'>
          <div className='register-header'>
            <h3 className='register-header__title'>Đăng ký</h3>
            <p className='register-header__subtitle'>Đã tồn tại tài khoản,
              <Link to={'/login'} className='text-[#0e0d0d] font-semibold'> đăng nhập tại đây</Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-field'>
              <input
                type='text'
                className='form-field__input'
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
              {errors.name && <p className='form-field__error' style={{ color: 'red' }}>
                {errors.name.message}
              </p>}
            </div>
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
                type='password'
                className='form-field__input'
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
              {errors.password &&
                <p className='form-field__error' style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>
            <div className='form-footer'>
              <button
                type='submit'
                className='submit-btn'
                disabled={isLoading}>
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
              </button>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}

export default Register