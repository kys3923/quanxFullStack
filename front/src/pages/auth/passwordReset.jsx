import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PasswordReset = (props) => {

  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ message, setMessage ] = useState('')
  const navigate = useNavigate()

  const inputStyle = 'border border-black rounded-md'

  const submitHandler = (e) => {
    e.preventDefault()

    if(password === '' || confirmPassword === '') {
      return setMessage('Please fill out forms')
    }

    if(password !== confirmPassword) {
      return setMessage('Passwords do not match')
    }

    const requestToAPI = async () => {
      let resetToken = window.location.pathname.slice(24)
      let sendingData = {
        password: password
      }
      try {
        const request = await axios.put(`${process.env.REACT_APP_SERVER_URL}/auth/passwordReset/${resetToken}`, sendingData)

        if(request.data.success) {
          navigate('/')
        }
      } catch (error) {
        setMessage(error.response.data.message)
      }
    }

    requestToAPI()
  }

  return (
    <section>
      <p>Password Reset Page</p>
      {message !== '' && <p className='text-red-500'>{message}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <p>password</p>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
        </div>
        <div>
          <p>confirm password</p>
          <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputStyle} />
        </div>
        <button type='submit'>Reset Password</button>
      </form>
    </section>
  );
}
export default PasswordReset;
