import { useState } from 'react'
import axios from 'axios'

const TestEmailPage = (props) => {

  const [ submitData, setSubmitData ] = useState({
    emailTo: '',
    emailFrom: '',
    emailContent: '',
  })

  const { emailTo, emailFrom, emailContent } = submitData

  const changeHandler = (e) => {
    setSubmitData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

   const inputStyles = 'border border-black rounded-md'

   const submitHandler = (e) => {
    e.preventDefault()

    console.log(submitData, 'yay')

    if(emailTo === '' || emailFrom === '' || emailContent === '') {
      return alert('Please fill out all forms')
    }

    const requestToAPI = async () => {
      try {
        const request = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/testEmail`, submitData)

        if(request.data) {
          console.log(request.data, 'yaay')
        }
      } catch (error) {
        console.log(error)
      }
    }

    requestToAPI()
   }

  return (
    <div>
      <p>Test Email Page</p>
      <div>
        <p>email To:</p>
        <input type='email' name='emailTo' value={emailTo} onChange={changeHandler} className={inputStyles} />
      </div>
      <div>
        <p>email From:</p>
        <input type='email' name='emailFrom' value={emailFrom} onChange={changeHandler} className={inputStyles} />
      </div>
      <div>
        <p>email content:</p>
        <textarea rows={4} name='emailContent' value={emailContent} onChange={changeHandler}className={inputStyles} />
      </div>
      <button onClick={submitHandler}>Send</button>
    </div>
  );
}
export default TestEmailPage;