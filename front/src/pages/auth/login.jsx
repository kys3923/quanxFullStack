import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [ submitForm, setSubmitForm ] = useState({
    email: '',
    password: ''
  })
  const [ message, setMessage ] = useState('asdf')

  const { email, password } = submitForm
  const navigate = useNavigate()

  const ChangeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if(email === '' || password === '') {
      return setMessage('Please fill out all forms')
    }

    const requestToAPI = async () => {
      const request = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, submitForm)

      if(request.data) {
        sessionStorage.setItem('authToken', request.data.token)
        sessionStorage.setItem('userId', request.data.userId)
        window.location.reload(false)
      }
    }

    requestToAPI()
  }

  useEffect(() => {
    if(sessionStorage.authToken) {
      navigate('/')
    }
  },[])

  const registerButtonHandler = (e) => {
    e.preventDefault()
    navigate('/account/register')
  }

  const forgotPasswordButtonHandler = (e) => {
    e.preventDefault()
    navigate('/account/forgotPassword')
  }

  const inputStyle = 'w-full border border-black rounded-md'

  return (
    <div className='flex flex-col p-12'>
      <p>Login Page</p>
      {message !== '' && <p className='text-red-500'>{message}</p>}
      <form onSubmit={submitHandler}>
        <p>id</p>
        <input type='email' name='email' value={email} onChange={ChangeHandler} className={inputStyle} />
        <p>password</p>
        <input type='password' name='password' value={password} onChange={ChangeHandler} className={inputStyle} />
        <button type='submit'>Login</button>
      </form>
      <div
        className='flex flex-row justify-center gap-2'
      >
        <p>Don't have an account?</p>
        <button 
          className='hover:text-red-600'
          onClick={registerButtonHandler}
        >
          Register Account
        </button>
      </div>
      <div
        className='flex flex-row justify-center gap-2 text-xs'
      >
        <p>Forgot Password?</p>
        <button 
          className='hover:text-red-600'
          onClick={forgotPasswordButtonHandler}
        >
          Click Here
        </button>
      </div>
    </div>
  );
}
export default Login;