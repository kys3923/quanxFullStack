import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = (props) => {

  const [ email, setEmail ] = useState('')
  const [ message, setMessage ] = useState('')
  const navigate = useNavigate()

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const submitData = {
      email: email
    }

    const requestToAPI = async () => {
      try {
        const request = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/forgotPassword`, submitData)
        if(request.data) {
          console.log(request.data, 'successful')
          setMessage('request successful')
          setTimeout(() => {
            navigate(`/account/forgotPassword/${request.data.resetUrl}`)
          }, 3000)
        } 
      } catch (error) {
        setMessage(error.response.data.message)
      }
    }

    requestToAPI()
  }

  return (
    <section>
      <p>Forgot Password Page</p>
      {message !== '' && <p className='text-red-500'>{message}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <p>Email</p>
          <input type='email' value={email} onChange={emailChangeHandler} className='border rounded-md border-black'/>
        </div>
        <button type='submit'>Request Password Reset</button>
      </form>
    </section>
  );
}
export default ForgotPassword;