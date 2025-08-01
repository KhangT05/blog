import requestApi from '@/helper/axios';
import { setUser } from '@/redux/slice/authSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormError] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData, [name]: value
    });
  }
  useEffect(() => {
    if (submitForm) {
      validateForm();
    }
  }, [signupData])
  const validateForm = () => {
    let isValid = true;
    let errors = {};
    if (signupData.name === '' || signupData.name === undefined) {
      errors.name = 'Vui lòng nhập tên đăng nhập.';
    }
    if (signupData.email === '' || signupData.email === undefined) {
      errors.email = 'Vui lòng nhập email.';
    } else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signupData.email);
      if (!valid) {
        errors.email = 'Nhập email sai định dạng.'
      }
    }
    if (signupData.password === '' || signupData.password === undefined) {
      errors.password = 'Vui lòng nhập mật khẩu.'
    }
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      isValid = false
    } else {
      setFormError({});
    }
    return isValid;
  }
  const onSubmit = async () => {
    setSubmitForm(true);
    let valid = validateForm();
    if (valid) {
      const response = await requestApi('/auth/register','POST', signupData);
      if (response?.data?.user) {
        dispatch(setUser(
          response.data.user
        ))
        navigate('/auth/login')
      } else {
        console.error(response?.data?.message || 'Đăng ký thất bại');
      }
    }
    setSubmitForm();
  }
  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg'>
      <div className='text-center text-sky-600 font-bold mb-6'>Đăng Ký</div>
      <form>
        <div className='flex flex-col mb-4'>
          <label className='text-lg font-bold mb-2 text-gray-600'>Tên đăng nhập</label>
          <input
            type='text'
            className='p-2 border rounded-sm border-gray-300'
            name='name'
            onChange={onChange}
            placeholder='Nhập tên đăng nhập' />
          {formErrors.name &&
            <p className='font-medium' style={{ color: 'red' }}>
              {formErrors.name}
            </p>}
        </div>
        <div className='flex flex-col mb-4'>
          <label className='text-lg font-bold mb-2 text-gray-600'>Email</label>
          <input
            type='email'
            className='p-2 border rounded-sm border-gray-300'
            name='email'
            onChange={onChange}
            placeholder='Nhập email' />
          {formErrors.email &&
            <p className='font-medium' style={{ color: 'red' }}>
              {formErrors.email}
            </p>}
        </div>
        <div className='flex flex-col mb-4'>
          <label className='text-lg font-bold mb-2 text-gray-600'>Mật khẩu</label>
          <input
            type='password'
            className='p-2 border rounded-sm border-gray-300'
            name='password'
            onChange={onChange}
            placeholder='Nhập mật khẩu' />
          {formErrors.password &&
            <p className='font-medium' style={{ color: 'red' }}>
              {formErrors.password}
            </p>}
        </div>
        <button
          type='button'
          onClick={onSubmit}
          className='w-full font-medium bg-sky-500 hover:bg-sky-600 rounded px-4 py-2 mb-2'>
          Đăng Ký
        </button>
      </form>
      <div className='text-center'>
        <p className='text-gray-600'>Đã có tài khoản?
          <Link to={'/account/login'} className='text-sky-400'> Đăng nhập tại đây
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register