import React from 'react'

const ReactContext = React.createContext({
  score: 0,
  setScore: () => {},
  attemptedCount: 0,
  setAttemptedCount: () => {},
  totalQuestions: 0,
  setTotalQuestions: () => {},
  question: [],
  setQuestions: () => {},
  selectedAnswers: [],
  setSelectedAnswers: () => {},
})

export default ReactContext
