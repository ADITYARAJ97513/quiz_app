import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import Donate from './Donate';

const Start = () => {
  const { 
    startQuiz, showStart, allSections, selectSection, selectedSection,
    showSubjectSelect, selectSubject, selectedSubject
  } = useContext(DataContext);

  return (
    <section className='text-white text-center bg-dark' style={{ display: showStart ? 'block' : 'none' }}>
      <div className='container'>
        <div className='row vh-100 align-items-center justify-content-center'>
          <div className='col-lg-8'>
            {showSubjectSelect ? (
              <div className='text-center'>
                <h1 className='fw-bold mb-4'>NPTEL(MOOC) QUIZ</h1>
                <h1 className='fw-bold mb-4'>by ADITYA RAJ</h1>
                <h2 className='mb-4'>Select Your Subject</h2>
                <div className='d-grid gap-3 col-lg-6 mx-auto mb-4'>
                  <button className='btn btn-light btn-lg' onClick={() => selectSubject('Economics')}>
                    Conservation Economics
                  </button>
                  <button className='btn btn-light btn-lg' onClick={() => selectSubject('Geography')}>
                    Conservation Geography
                  </button>
                </div>
                <Donate />
              </div>
            ) : (
              <div>
                <h1 className='fw-bold mb-4'>NPTEL(MOOC) QUIZ</h1>
                <h1 className='fw-bold mb-4'>by ADITYA RAJ</h1>
                <h2>Conservation {selectedSubject}</h2>
                <h3>Each question carries 5 marks</h3>
                <div className='mb-3'>
                  <select className='form-select' onChange={(e) => selectSection(e.target.value)} value={selectedSection || ''}>
                    <option value='' disabled>Select Week</option>
                    <option value='Random 20 Questions'>Random 20 Questions</option>
                    <option value='All Questions (Jumbled)'>All {allSections.length} Questions (Jumbled)</option>
                    {allSections.map((sec, index) => (
                      <option key={index} value={sec.section}>{sec.section}</option>
                    ))}
                  </select>
                </div>
                <div className='d-grid gap-3 mx-auto mb-4'>
                  <button className='btn px-4 py-2 bg-light text-dark fw-bold' onClick={startQuiz} disabled={!selectedSection}>
                    Start Quiz
                  </button>
                  <button className='btn btn-outline-light' onClick={() => {
                    selectSubject(null);
                    selectSection('');
                  }}>
                    Back to Subject Selection
                  </button>
                </div>
                <Donate />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;