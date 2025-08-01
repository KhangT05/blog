import requestApi from '@/helper/axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '@/redux/slice/authSlice';
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormError] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state=> state.auth)
  const onChange = (event) => {
    event.preventDefault();
    let target = event.target;
    setLoginData({
      ...loginData, [target.name]: target.value
    });
  }
  useEffect(() =>{
    if(isAuthenticated){
      navigate('/dashboard')
    }
  },[isAuthenticated,navigate])
  useEffect(() => {
    if (submitForm) {
      validateForm();
    }
  }, [loginData])
  const validateForm = () => {
    let isValid = true;
    let errors = {};
    if (loginData.email === '' || loginData.email === undefined) {
      errors.email = 'Vui lòng nhập email.';
    } else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email);
      if (!valid) {
        errors.email = 'Nhập email sai định dạng.'
      }
    }
    if (loginData.password === '' || loginData.password === undefined) {
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
    let valid = validateForm();
    if (valid) {
      const response = await requestApi("/auth/login", "POST", loginData);
      if(response?.data?.user){
        dispatch(setUser({user:response.data.user}))
        navigate('/dashboard');
      }else {
        setFormError({ general: 'Đăng nhập thất bại. Vui lòng thử lại.' });
      }
    }
    setSubmitForm();
  }
  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg'>
      <div className='text-center text-sky-600 font-bold mb-6'>Đăng nhập</div>
      {formErrors.general && (
        <p className='text-red-500 font-medium mb-2'>
          {formErrors.general}
        </p>
      )}
      <form>
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
        <div className='flex justify-between mb-4'>
          <span> <input type='checkbox' /> Ghi nhớ mật khẩu</span>
          <Link>Quên mật khẩu?</Link>
        </div>
        <button
          type='button'
          onClick={onSubmit}
          className='w-full font-medium bg-sky-500 hover:bg-sky-600 rounded px-4 py-2 mb-2'>
          Đăng nhập
        </button>
      </form>
      <div className='text-center'>
        <p className='text-gray-600'>Chưa có tài khoản?
          <Link to={'/account/register'} className='text-sky-400'> Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login