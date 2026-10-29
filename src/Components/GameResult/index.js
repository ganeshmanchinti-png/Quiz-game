import './index.css'
import Header from '../Header'
import {useContext} from 'react'
import {useHistory} from 'react-router-dom'

import ReactContext from '../ReactContext'

const GameResult = () => {
  const {score, totalQuestions} = useContext(ReactContext)

  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  const isPassed = percentage >= 60

  const history = useHistory()

  const onClickReport = () => {
    history.push('/game-report')
  }
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="insidew">
          {isPassed ? (
            <div className="lls">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                alt="won"
                className="won"
              />
              <h1>Congrats</h1>
              <h1 className="ii">{percentage}% Correctly Answered</h1>
              <p>Quiz completed successfully</p>
              <p>
                You attempted {score} out of {totalQuestions} questions as
                correct.
              </p>

              <button type="button" className="next" onClick={onClickReport}>
                Report
              </button>
            </div>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                alt="lose"
                className="won"
              />
              <h1>You lose</h1>
              <h1 className="ii">{percentage}% Correctly Answered</h1>
              <p>Quiz completed successfully</p>
              <p>
                You attempted {score} out of {totalQuestions} questions as
                correct.
              </p>

              <button type="button" className="next" onClick={onClickReport}>
                Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameResult
