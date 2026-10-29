import {Switch, Route} from 'react-router-dom'

import {useState} from 'react'

import './App.css'
import ProtectedRoute from './Components/ProtectedRoute'
import Login from './Components/Login'
import Home from './Components/Home'
import GameRoute from './Components/GameRoute'
import GameResult from './Components/GameResult'
import GameReports from './Components/GameReports'
import ReactContext from './Components/ReactContext'
import NotFound from './Components/NotFound'

// Replace your code here

const App = () => {
  const [score, setScore] = useState(0)

  const [attemptedCount, setAttemptedCount] = useState(0)

  const [totalQuestions, setTotalQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [question, setQuestions] = useState([])

  return (
    <ReactContext.Provider
      value={{
        score,
        setScore,
        question,
        setQuestions,
        attemptedCount,
        setAttemptedCount,
        totalQuestions,
        setTotalQuestion,
        selectedAnswers,
        setSelectedAnswers,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/quiz-game" component={GameRoute} />
        <ProtectedRoute exact path="/game-results" component={GameResult} />
        <ProtectedRoute exact path="/game-report" component={GameReports} />
        <Route component={NotFound} />
      </Switch>
    </ReactContext.Provider>
  )
}

export default App
