import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterAccount = (props) => {

  const [ submitForm, setSubmitForm ] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    contact: ''
  })
  const [ message, setMessage ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.authToken) {
      navigate('/')
    }
  },[])

  const ChangeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const { username, email, password, address, contact } = submitForm

  const formInput = 'w-full border '

  const submitHandler = (e) => {
    e.preventDefault()
    if(username === '' || email === '' || password === '' || address === '' || contact === '') {
      return setMessage('Please fill out all forms')
    }

    const requestToAPI = async () => {
      const request = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, submitForm)
      if(request.data) {
        sessionStorage.setItem('authToken', request.data.token)
        sessionStorage.setItem('userId', request.data.userId)
        window.location.reload(false)
        console.log(request.data, 'successful')
      }
    }

    requestToAPI()
  }

  return (
    <section
      className='p-12'
    >
      <p>Register Account</p>
      {message !== '' && <p className='text-red-500'>{message}</p>}
      <form
        className='flex flex-col gap-2'
        onSubmit={submitHandler}
      >
        <div>
          <p>username</p>
          <input type='text' name='username' onChange={ChangeHandler} value={username} className={formInput} />
        </div>
        <div>
          <p>email</p>
          <input type='text' name='email' onChange={ChangeHandler} value={email} className={formInput} />
        </div>
        <div>
          <p>password</p>
          <input type='password' name='password' onChange={ChangeHandler} value={password} className={formInput} />
        </div>
        <div>
          <p>address</p>
          <input type='text' name='address' onChange={ChangeHandler} value={address} className={formInput} />
        </div>
        <div>
          <p>contact</p>
          <input type='text' name='contact' onChange={ChangeHandler} value={contact} className={formInput} />
        </div>
        <button 
          className='w-full hover:text-red-500'
          type='submit'
        >
          Register
        </button>
      </form>
    </section>
  );
}
export default RegisterAccount;