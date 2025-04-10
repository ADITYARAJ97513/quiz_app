import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Start = () => {
  const { startQuiz, showStart, allSections, selectSection, selectedSection } = useContext(DataContext);

  return (
    <section className='text-white text-center bg-dark' style={{ display: showStart ? 'block' : 'none' }}>
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <h1 className='fw-bold mb-4'>NPTEL(MOOC) QUIZ</h1>
            <h1 className='fw-bold mb-4'>by ADITYA RAJ</h1>
            <h3>each question carries 5 marks</h3>

            {/* Social Links */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/adityarajbitmesra" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg width="30" height="30" fill="white" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.324 0 .725 0h14.55c.4 0 .725.513.725 1.146v13.708c0 .633-.324 1.146-.725 1.146H.725A.723.723 0 0 1 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.216c.837 0 1.356-.554 1.356-1.248-.015-.708-.519-1.248-1.341-1.248-.822 0-1.356.54-1.356 1.248 0 .694.519 1.248 1.326 1.248h.015zm4.908 8.216V9.359c0-.213.015-.426.079-.578.174-.426.571-.868 1.237-.868.873 0 1.222.656 1.222 1.619v3.862h2.401V9.256c0-2.219-1.184-3.252-2.764-3.252-1.274 0-1.845.705-2.165 1.203h.03V6.169H7.651c.03.705 0 7.225 0 7.225h2.401z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/adityaraj97512/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg width="30" height="30" fill="white" viewBox="0 0 16 16">
                  <path d="M8 0C5.8 0 5.5 0 4.7.1 3.9.2 3.3.5 2.8.9c-.5.5-.7 1.1-.8 1.9C1.9 4.5 1.9 4.8 1.9 8s0 3.5.1 4.3c.1.8.3 1.4.8 1.9.5.5 1.1.7 1.9.8.8.1 1.1.1 4.3.1s3.5 0 4.3-.1c.8-.1 1.4-.3 1.9-.8.5-.5.7-1.1.8-1.9.1-.8.1-1.1.1-4.3s0-3.5-.1-4.3c-.1-.8-.3-1.4-.8-1.9-.5-.5-1.1-.7-1.9-.8C11.5.1 11.2 0 8 0zm0 1.5c3.1 0 3.4 0 4.2.1.6.1 1 .2 1.2.4.3.2.5.5.6 1.2.1.8.1 1.1.1 4.2s0 3.4-.1 4.2c-.1.6-.2 1-.4 1.2-.2.3-.5.5-1.2.6-.8.1-1.1.1-4.2.1s-3.4 0-4.2-.1c-.6-.1-1-.2-1.2-.4-.3-.2-.5-.5-.6-1.2-.1-.8-.1-1.1-.1-4.2s0-3.4.1-4.2c.1-.6.2-1 .4-1.2.2-.3.5-.5 1.2-.6.8-.1 1.1-.1 4.2-.1zM8 3.9a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2zm0 6.7A2.6 2.6 0 1 1 8 5.4a2.6 2.6 0 0 1 0 5.2zm4.5-6.9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </a>
            </div>

            {/* Section Dropdown */}
            <div className="mb-3">
              <select
                className="form-select"
                onChange={(e) => selectSection(e.target.value)}
                value={selectedSection || ''}
              >
                <option value="" disabled>Select Week</option>
                {allSections.map((sec, index) => (
                  <option key={index} value={sec.section}>{sec.section}</option>
                ))}
              </select>
            </div>

            {/* Start Quiz Button */}
            <button
              onClick={startQuiz}
              className="btn px-4 py-2 bg-light text-dark fw-bold"
              disabled={!selectedSection}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
