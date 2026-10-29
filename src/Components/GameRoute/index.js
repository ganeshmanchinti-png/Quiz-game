import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import {Link, useHistory} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import ReactContext from '../ReactContext'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const GameRoute = () => {
  const {question, setQuestions} = useContext(ReactContext)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [timer, setTimer] = useState(15)

  const [selectedOptionId, setSelectedOptionId] = useState(null)

  const [status, setApiStatus] = useState(apiStatusConstants.inProgress)

  const {score, setScore} = useContext(ReactContext)

  const {attemptedCount, setAttemptedCount} = useContext(ReactContext)

  const {totalQuestions, setTotalQuestion} = useContext(ReactContext)

  const {selectedAnswers, setSelectedAnswers} = useContext(ReactContext)

  const history = useHistory()

  useEffect(() => {
    if (status !== apiStatusConstants.success) {
      return
    }

    if (selectedOptionId !== null) {
      return
    }

    if (timer === 0) {
      if (currentQuestionIndex < question.length - 1) {
        setCurrentQuestionIndex(prevState => prevState + 1)
        setTimer(15)
        setSelectedOptionId(null)
      } else {
        history.replace('/game-results')
      }
      return
    }

    const timerId = setInterval(() => {
      setTimer(prevState => prevState - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [timer, selectedOptionId, status, currentQuestionIndex, question.length])

  const getQuestions = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    setScore(0)
    setAttemptedCount(0)
    setSelectedAnswers([])

    try {
      const token = Cookies.get('jwt_token')

      const response = await fetch('https://apis.ccbp.in/assess/questions', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        const questionData = data.questions.map(eachItem => ({
          id: eachItem.id,
          text: eachItem.question_text,
          optionsType: eachItem.options_type,
          options: eachItem.options.map(option => ({
            id: option.id,
            text: option.text,
            isCorrect: option.is_correct === 'true',
            imageUrl: option.image_url,
          })),
        }))

        console.log(questionData)

        setQuestions(questionData)
        setTotalQuestion(questionData.length)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  const onChangeQuestion = () => {
    if (currentQuestionIndex < question.length - 1) {
      setCurrentQuestionIndex(prevState => prevState + 1)
      setTimer(15)
      setSelectedOptionId(null)
    }
  }

  const onSelectionOption = id => {
    if (selectedOptionId !== null) {
      return
    }

    setSelectedOptionId(id)
    setAttemptedCount(prevState => prevState + 1)

    const currentQuestion = question[currentQuestionIndex]

    setSelectedAnswers(prevState => [
      ...prevState,
      {
        questionId: currentQuestion.id,
        selectedOption: id,
      },
    ])

    const selectedOption = currentQuestion.options.find(
      eachItem => eachItem.id === id,
    )

    if (
      selectedOption.isCorrect === true ||
      selectedOption.isCorrect === 'true'
    ) {
      setScore(prevState => prevState + 1)
    }
  }

  const renderFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="failure view"
          className="image2"
        />
        <h1 className="f">Something went wrong</h1>
        <p className="i">Our servers are busy please try again</p>
        <button type="button" className="retry" onClick={() => getQuestions()}>
          Retry
        </button>
      </div>
    )
  }

  const renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#263868" height={50} width={50} />
      </div>
    )
  }

  const renderSuccessView = () => {
    return (
      <div>
        <div className="topv">
          <div className="q">
            <p>Questions</p>
            <p className="js">
              {currentQuestionIndex + 1}/{question.length}
            </p>
          </div>

          <div className="u">
            <p>{timer}</p>
          </div>
        </div>

        {question.length > 0 && (
          <div>
            <p>{question[currentQuestionIndex].text}</p>
            <div>
              {question[currentQuestionIndex].optionsType === 'DEFAULT' && (
                <ul>
                  {question[currentQuestionIndex].options.map(eachItem => {
                    let optionClassName = 'o'
                    let icon = ''
                    if (selectedOptionId !== null) {
                      if (
                        eachItem.isCorrect === true ||
                        eachItem.isCorrect === 'true'
                      ) {
                        optionClassName = 'o correct'
                        icon =
                          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                      } else if (selectedOptionId === eachItem.id) {
                        optionClassName = 'o wrong'
                        icon =
                          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                    }
                    return (
                      <li className="as" key={eachItem.id}>
                        <button
                          type="button"
                          key={eachItem.id}
                          className={optionClassName}
                          onClick={() => onSelectionOption(eachItem.id)}
                        >
                          {eachItem.text}
                        </button>
                        {icon !== '' && (
                          <img
                            src={icon}
                            alt={
                              eachItem.isCorrect === true ||
                              eachItem.isCorrect === 'true'
                                ? 'correct checked circle'
                                : 'incorrect close circle'
                            }
                            className="answer-icon"
                          />
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}

              {question[currentQuestionIndex].optionsType ===
                'SINGLE_SELECT' && (
                <ul>
                  {question[currentQuestionIndex].options.map(eachItem => {
                    let radioIcon = ''

                    if (selectedOptionId !== null) {
                      if (
                        eachItem.isCorrect === true ||
                        eachItem.isCorrect === 'true'
                      ) {
                        radioIcon =
                          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                      } else if (selectedOptionId === eachItem.id) {
                        radioIcon =
                          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                    }

                    return (
                      <li key={eachItem.id} className="final">
                        <input
                          type="radio"
                          name={question[currentQuestionIndex].id}
                          id={eachItem.id}
                          checked={selectedOptionId === eachItem.id}
                          onChange={() => onSelectionOption(eachItem.id)}
                        />
                        <label
                          className={`o ${
                            selectedOptionId !== null
                              ? eachItem.isCorrect === true ||
                                eachItem.isCorrect === 'true'
                                ? 'correct'
                                : selectedOptionId === eachItem.id
                                ? 'wrong'
                                : ''
                              : ''
                          }`}
                          htmlFor={eachItem.id}
                        >
                          {eachItem.text}
                        </label>

                        {radioIcon !== '' && (
                          <img
                            src={radioIcon}
                            alt={
                              eachItem.isCorrect === true ||
                              eachItem.isCorrect === 'true'
                                ? 'correct checked circle'
                                : 'incorrect close circle'
                            }
                            className="answer-icon"
                          />
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}

              {question[currentQuestionIndex].optionsType === 'IMAGE' && (
                <ul>
                  {question[currentQuestionIndex].options.map(eachItem => {
                    let imageIcon = ''
                    let iconAlt = ''

                    if (selectedOptionId !== null) {
                      if (
                        eachItem.isCorrect === true ||
                        eachItem.isCorrect === 'true'
                      ) {
                        imageIcon =
                          'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                        iconAlt = 'correct checked circle'
                      } else if (selectedOptionId === eachItem.id) {
                        imageIcon =
                          'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                        iconAlt = 'incorrect close circle'
                      }
                    }

                    return (
                      <li key={eachItem.id} className="image-container">
                        <button
                          type="button"
                          className={`image-option ${
                            selectedOptionId !== null
                              ? eachItem.isCorrect === true ||
                                eachItem.isCorrect === 'true'
                                ? 'correct'
                                : selectedOptionId === eachItem.id
                                ? 'wrong'
                                : ''
                              : ''
                          }`}
                          onClick={() => onSelectionOption(eachItem.id)}
                        >
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.text}
                            className="image"
                          />
                        </button>

                        {imageIcon !== '' && (
                          <img
                            src={imageIcon}
                            alt={iconAlt}
                            className="answer-icon"
                          />
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
        <div className="asdf">
          {currentQuestionIndex === question.length - 1 ? (
            <Link to="/game-results" className="nav">
              <button type="button" className="next">
                Submit
              </button>
            </Link>
          ) : (
            <button type="button" className="next" onClick={onChangeQuestion}>
              Next Question
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderAllViews = () => {
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()

      case apiStatusConstants.success:
        return renderSuccessView()

      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return (
    <div className="game">
      <Header />

      <div className="home-container">
        <div className="insides">{renderAllViews()}</div>
      </div>
    </div>
  )
}

export default GameRoute
