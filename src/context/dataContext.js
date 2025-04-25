import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [allSections, setAllSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => {
        setAllSections(data);
      });
  }, []);

  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const selectSection = (sectionName) => {
    setSelectedSection(sectionName);
  
    if (sectionName === "Random 20 Questions") {
      const allQuestions = allSections.flatMap(sec => sec.questions);
      const randomQuestions = allQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);
      setQuizs(randomQuestions);
    } else if (sectionName === "All 120 Questions (Jumbled)") {
      const allQuestions = allSections.flatMap(sec => sec.questions);
      const jumbledAll = allQuestions.sort(() => 0.5 - Math.random());
      setQuizs(jumbledAll);
    } else {
      const section = allSections.find(sec => sec.section === sectionName);
      if (section) {
        setQuizs(section.questions);
      }
    }
  };
  

  const startQuiz = () => {
    if (!quizs.length) return;
    setShowStart(false);
    setShowQuiz(true);
  };

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);
      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  };

  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    document.querySelector('button.bg-danger')?.classList.remove('bg-danger');
    document.querySelector('button.bg-success')?.classList.remove('bg-success');
    setQuestionIndex(prev => prev + 1);
  };

  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    document.querySelector('button.bg-danger')?.classList.remove('bg-danger');
    document.querySelector('button.bg-success')?.classList.remove('bg-success');
  };

  return (
    <DataContext.Provider value={{
      allSections, selectedSection, selectSection,
      startQuiz, showStart, showQuiz, question, quizs, checkAnswer,
      correctAnswer, selectedAnswer, questionIndex, nextQuestion,
      showTheResult, showResult, marks, startOver
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;