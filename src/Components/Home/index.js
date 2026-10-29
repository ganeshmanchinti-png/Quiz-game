import Header from '../Header'
import {Link} from 'react-router-dom'

import './index.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="inside">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
            alt="start quiz game"
            className="startGame"
          />
          <h1 className="heading">
            How Many Of These Questions Do You Actually Know?
          </h1>
          <p className="para">
            Test yourself with these easy quiz questions and answers
          </p>
          <Link to="/quiz-game" className="nav">
            <button type="button" className="StartQ">
              Start Quiz
            </button>
          </Link>
          <div className="w">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              alt="warning icon"
              className="message"
            />
            <p className="fd">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
