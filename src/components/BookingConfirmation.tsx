import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';

interface BookingConfirmationProps {
  isVisible: boolean;
  onClose: () => void;
  bookingDetails: {
    destination: string;
    room: string;
    dates: string;
    travelers: number;
    totalCost: string;
  };
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  isVisible, 
  onClose, 
  bookingDetails 
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('entering');

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase('entering');
      
      // Show the message after a short delay
      const messageTimer = setTimeout(() => {
        setShowMessage(true);
        setAnimationPhase('visible');
      }, 500);

      // Play the voice message
      const voiceTimer = setTimeout(() => {
        playVoiceMessage();
      }, 1000);

      return () => {
        clearTimeout(messageTimer);
        clearTimeout(voiceTimer);
      };
    } else {
      setShowMessage(false);
      setAnimationPhase('entering');
    }
  }, [isVisible]);

  const playVoiceMessage = () => {
    // Create speech synthesis for "May the force be with you"
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('May the force be with you');
      
      // Configure voice settings for a more dramatic effect
      utterance.rate = 0.8; // Slower speech
      utterance.pitch = 0.7; // Lower pitch
      utterance.volume = 0.8;
      
      // Try to find a male voice
      const voices = speechSynthesis.getVoices();
      const maleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('male') || 
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('alex')
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'SW-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const bookingRef = generateBookingReference();

  if (!isVisible) return null;

  return (
    <div className="booking-confirmation-overlay" onClick={onClose}>
      <div 
        className={`booking-confirmation-modal ${animationPhase}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmation-header">
          <div className="jedi-symbol">⭐</div>
          <h2 className="confirmation-title">Booking Confirmed!</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {showMessage && (
          <div className="confirmation-content">
            <div className="force-message">
              <div className="lightsaber-glow"></div>
              <p className="force-text">"May the Force be with you"</p>
              <div className="lightsaber-glow"></div>
            </div>

            <div className="booking-details">
              <div className="booking-reference">
                <h3>Booking Reference</h3>
                <div className="reference-code">{bookingRef}</div>
              </div>

              <div className="booking-summary">
                <h3>Your Space Adventure</h3>
                <div className="detail-row">
                  <span className="detail-label">Destination:</span>
                  <span className="detail-value">{bookingDetails.destination}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Accommodation:</span>
                  <span className="detail-value">{bookingDetails.room}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Travel Dates:</span>
                  <span className="detail-value">{bookingDetails.dates}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Travelers:</span>
                  <span className="detail-value">{bookingDetails.travelers} person{bookingDetails.travelers !== 1 ? 's' : ''}</span>
                </div>
                <div className="detail-row total-row">
                  <span className="detail-label">Total Cost:</span>
                  <span className="detail-value total-cost">{bookingDetails.totalCost}</span>
                </div>
              </div>

              <div className="next-steps">
                <h3>What's Next?</h3>
                <ul className="steps-list">
                  <li>📧 Confirmation email sent to your address</li>
                  <li>🚀 Pre-flight preparation guide will arrive 30 days before departure</li>
                  <li>👨‍🚀 Space suit fitting appointment will be scheduled</li>
                  <li>🌌 Get ready for the adventure of a lifetime!</li>
                </ul>
              </div>
            </div>

            <div className="confirmation-actions">
              <button className="print-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                </svg>
                Print Confirmation
              </button>
              <button className="email-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email Confirmation
              </button>
              <button className="continue-btn" onClick={onClose}>
                Continue Exploring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;
