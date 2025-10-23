import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import { FaInstagram, FaLinkedin } from 'react-icons/fa'; // <-- 1. ADDED IMPORT

const Start = () => {
  const {
    startQuiz, showStart, allSections, selectSection, selectedSection,
    showSubjectSelect, selectSubject, selectedSubject, loading
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
                  <button className='btn btn-light btn-lg' >
                    Pshycology In Learning (work in progress)
                  </button>
                </div>
                
                
                <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                  <a
                    href="https://www.instagram.com/adityaraj97512/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white fs-2" 
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adityarajbitmesra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white fs-2" 
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <h1 className='fw-bold mb-4'>NPTEL(MOOC) QUIZ</h1>
                <h1 className='fw-bold mb-4'>by ADITYA RAJ</h1>
                <h2>Conservation {selectedSubject}</h2>
                <h3>Each question carries 5 marks</h3>
                <div className='mb-3'>
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2">Loading quiz data...</p>
                    </div>
                  ) : (
                    <select className='form-select' onChange={(e) => selectSection(e.target.value)} value={selectedSection || ''}>
                      <option value='' disabled>Select Week</option>
                      <option value='Random 20 Questions'>Random 20 Questions</option>
                      <option value='All 120 Questions (Jumbled)'>All 120 Questions (Jumbled)</option>
                      {allSections.map((sec, index) => (
                        <option key={index} value={sec.section}>{sec.section}</option>
                      ))}
                    </select>
                  )}
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
                <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                  <a
                    href="https://www.instagram.com/adityaraj97512/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white fs-2" 
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adityarajbitmesra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white fs-2" 
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;