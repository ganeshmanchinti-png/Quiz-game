import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onChangeLogin = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        src="https://res.cloudinary.com/do4r39azg/image/upload/f_auto/q_auto/Frame_8787.png"
        className="l"
      />

      <button className="log-out" type="button" onClick={onChangeLogin}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
