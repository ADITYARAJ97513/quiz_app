import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
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
  const [showSubjectSelect, setShowSubjectSelect] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedSubject) {
      setShowSubjectSelect(true);
    } else {
      setLoading(true);
      const filename = selectedSubject === 'Economics' ? 'quiz.json' : 'conservation-geography.json';
      fetch(filename)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch quiz data');
          }
          return res.json();
        })
        .then(data => {
          setAllSections(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading quiz data:', error);
          setAllSections([]);
          setLoading(false);
        });
    }
  }, [selectedSubject]);

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

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setSelectedSection(null);
    setQuizs([]);
    setMarks(0);
    setQuestionIndex(0);
    setCorrectAnswer('');
    setSelectedAnswer('');
    
    if (subject) {
      setShowSubjectSelect(false);
      setShowStart(true);
      setShowQuiz(false);
      setShowResult(false);
    } else {
      // Reset to subject selection when subject is null
      setShowSubjectSelect(true);
      setShowStart(true);
      setShowQuiz(false);
      setShowResult(false);
    }
  };

  return (
    <DataContext.Provider value={{
      allSections, selectedSection, selectSection,
      startQuiz, showStart, showQuiz, question, quizs, checkAnswer,
      correctAnswer, selectedAnswer, questionIndex, nextQuestion,
      showTheResult, showResult, marks, startOver,
      selectedSubject, selectSubject, showSubjectSelect, setShowSubjectSelect,
      setQuizs, setMarks, setQuestionIndex, setSelectedAnswer, setCorrectAnswer,
      setShowResult, setShowStart, setShowQuiz, loading, setSelectedSubject
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;