import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')

  const [isShow, showPassword] = useState(false)

  const [message, setMessage] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')

    setMessage(false)
  }

  const onFailure = error => {
    setErrorMsg(error)
    setMessage(true)
  }

  const onSubmitUser = async event => {
    event.preventDefault()

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)

    const data = await response.json()

    if (response.ok === true) {
      onSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      onFailure(data.error_msg)
    }
  }

  const onUsername = event => {
    setName(event.target.value)
  }

  const onPassword = event => {
    setPassword(event.target.value)
  }

  const onShowPassword = () => {
    showPassword(prevState => !prevState)
  }

  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <div className="inside-login">
        <form className="container" onSubmit={onSubmitUser}>
          <div className="s">
            <img
              src="https://res.cloudinary.com/do4r39azg/image/upload/f_auto/q_auto/Frame_8787.png"
              className="logo"
              alt="login website logo"
            />
          </div>
          <div>
            <label htmlFor="name" className="value">
              USERNAME
            </label>
            <input
              type="text"
              className="input"
              id="name"
              onChange={onUsername}
            />
            <label htmlFor="userpassword" className="value">
              PASSWORD
            </label>
            <input
              type={isShow ? 'text' : 'password'}
              className="input"
              id="userpassword"
              onChange={onPassword}
            />
            <div className="p">
              <input
                id="sh"
                type="checkbox"
                className="checkboxvalue"
                onClick={onShowPassword}
              />
              <label htmlFor="sh" className="show">
                Show Password
              </label>
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            {message && <p>{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
