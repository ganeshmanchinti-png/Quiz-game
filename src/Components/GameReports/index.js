import Header from '../Header'
import {useContext} from 'react'
import './index.css'
import ReactContext from '../ReactContext'

const GameReports = () => {
  const {score, attemptedCount, totalQuestions, question, selectedAnswers} =
    useContext(ReactContext)

  const correctAnswer = score
  const incorrectAnswer = attemptedCount - score
  const unattempted = totalQuestions - attemptedCount

  const unattemptedQuestions = question.filter(eachQuestion =>
    selectedAnswers.every(eachItem => eachItem.questionId !== eachQuestion.id),
  )

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="inside">
          <div className="top">
            <p className="j">
              {score}/{totalQuestions}
            </p>

            <div>
              <p className="ed">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="answer-icon"
                />
                {correctAnswer} Correct answers
              </p>

              <p className="ed">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="answer-icon"
                />
                {incorrectAnswer} Incorrect answers
              </p>

              <p className="ed">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="answer-icon"
                />
                {unattempted} Unattempted answers
              </p>
            </div>
          </div>

          <div className="bottom">
            <h1 className="heading">Unattempted Questions</h1>

            {unattemptedQuestions.length === 0 ? (
              <h1 className="heading">Attempted all the questions</h1>
            ) : (
              <div className="jk">
                {unattemptedQuestions.map(eachItem => {
                  if (eachItem.optionsType === 'DEFAULT') {
                    return (
                      <div key={eachItem.id}>
                        <p>{eachItem.text}</p>
                        <ul>
                          {eachItem.options.map(eachOption => (
                            <li key={eachOption.id} className="ed">
                              <p
                                className={`o ${
                                  eachOption.isCorrect === true
                                    ? 'correct-option'
                                    : ''
                                }`}
                              >
                                {eachOption.text}
                              </p>

                              {eachOption.isCorrect === 'true' && (
                                <img
                                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                  className="answer-icon"
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }

                  if (eachItem.optionsType === 'SINGLE_SELECT') {
                    return (
                      <div key={eachItem.id}>
                        <p>{eachItem.text}</p>

                        {eachItem.options.map(eachOption => (
                          <div className="ddf" key={eachOption.id}>
                            <p key={eachOption.id}>
                              <input
                                type="radio"
                                id={`option-${eachOption.id}`}
                                name={`question-${eachItem.id}`}
                                checked={eachOption.isCorrect === 'true'}
                                readOnly
                              />
                              <label htmlFor={`option-${eachOption.id}`}>
                                {eachOption.text}
                              </label>
                              {eachOption.isCorrect === 'true' && (
                                <div>
                                  <img
                                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                    alt="correct answer"
                                    className="answer-icon"
                                  />
                                </div>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  }

                  if (eachItem.optionsType === 'IMAGE') {
                    return (
                      <div key={eachItem.id}>
                        <p>{eachItem.text}</p>

                        {eachItem.options.map(eachOption => (
                          <div className="ddf">
                            <img
                              key={eachOption.id}
                              src={eachOption.imageUrl}
                              alt={eachOption.text}
                              className="image"
                            />

                            {eachOption.isCorrect === 'true' && (
                              <div>
                                <img
                                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                                  alt="correct answer"
                                  className="answer-icon"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameReports
