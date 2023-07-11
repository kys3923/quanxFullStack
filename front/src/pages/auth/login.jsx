import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [ submitForm, setSubmitForm ] = useState({
    id: '',
    password: ''
  })

  const { id, password } = submitForm
  const navigate = useNavigate()

  const ChangeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(submitForm)
  }

  const registerButtonHandler = (e) => {
    e.preventDefault()
    navigate('/account/register')
  }

  const inputStyle = 'w-full border border-black rounded-md'

  return (
    <div className='flex flex-col p-12'>
      <p>Login Page</p>
      <form onSubmit={submitHandler}>
        <p>id</p>
        <input type='text' name='id' value={id} onChange={ChangeHandler} className={inputStyle} />
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
    </div>
  );
}
export default Login;