import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Result = () => {
    const { 
        showResult,
        quizs,
        marks,
        startOver,
        setShowSubjectSelect,
        setShowResult,
        setShowStart,
        setShowQuiz,
        setQuizs,
        setMarks,
        setQuestionIndex,
        selectSection,
        setSelectedAnswer,
        setCorrectAnswer,
        selectSubject,
        selectedSection,
        allSections,
        startQuiz
    } = useContext(DataContext);

    const backToSubjectSelection = () => {
        // Reset all quiz states
        setQuizs([]);
        setMarks(0);
        setQuestionIndex(0);
        setSelectedAnswer('');
        setCorrectAnswer('');
        selectSection('');
        selectSubject(null);
        
        // Change view states
        setShowResult(false);
        setShowQuiz(false);
        setShowStart(true);
        setShowSubjectSelect(true);
    };

    const goToNextWeek = () => {
        // Find current section index
        const regularSections = allSections.map(sec => sec.section);
        const currentIndex = regularSections.indexOf(selectedSection);
        
        // Reset quiz states
        setQuizs([]);
        setMarks(0);
        setQuestionIndex(0);
        setSelectedAnswer('');
        setCorrectAnswer('');

        // Determine next section
        let nextSection;
        if (currentIndex === -1 || currentIndex === regularSections.length - 1) {
            nextSection = regularSections[0];
        } else {
            nextSection = regularSections[currentIndex + 1];
        }

        // Set the section and prepare quiz
        selectSection(nextSection);

        // Reset view states and start quiz directly
        setShowResult(false);
        setShowQuiz(true);
        setShowStart(false);
        setShowSubjectSelect(false);
    };
    const isRegularWeek = selectedSection && 
        selectedSection !== 'Random 20 Questions' && 
        selectedSection !== 'All 120 Questions (Jumbled)';
    
    return (
        <section className="bg-dark text-white" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className={`text-light text-center p-5 rounded ${marks > (quizs.length * 5 / 2) ? 'bg-success' : 'bg-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{marks > (quizs.length * 5 / 2) ? 'Awesome!' : 'Oops!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {marks} out of {quizs.length * 5}</h3>

                            <div className='d-grid gap-3 col-lg-8 mx-auto'>
                                <button onClick={startOver} className='btn py-2 px-4 btn-light fw-bold'>Start Over</button>
                                {isRegularWeek && (
                                    <button className='btn btn-success' onClick={goToNextWeek}>
                                        Next Week's Quiz
                                    </button>
                                )}
                                <button className='btn btn-outline-light' onClick={backToSubjectSelection}>
                                    Back to Subject Selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;