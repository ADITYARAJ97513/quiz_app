import React, { useState, useEffect } from 'react';

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Auto-hide toast after 3s
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-light"
          onClick={openModal}
        >
          Support the Developer ☕
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h5 className="mb-2">Scan UPI QR (not necessary to pay , it's only for testing )</h5>
            <img
              src="/adi.jpg"
              alt="UPI QR Code"
              style={{
                width: '200px',
                height: '200px',
                border: '2px solid #222',
                borderRadius: '10px'
              }}
            />

            {/* Payment Hint Animation */}
            <div className="payment-hint">
              <span className="arrow">⬇️</span> Open any UPI app to scan!
            </div>

            <p className="mt-3"><strong>UPI ID:</strong> adityaraj97512@okaxis</p>

            <button className="btn btn-dark mt-3" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="thank-you-toast">
          Thank you for your support! 🙏
        </div>
      )}
    </>
  );
};

export default Donate;


