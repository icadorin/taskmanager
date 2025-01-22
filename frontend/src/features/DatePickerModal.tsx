import React, { useEffect, useRef } from 'react';
import '../styles/date-picker.css';

interface DatePickerModalProps {
  onClose: () => void;
  currentDate: Date;
  position: { top: number; left: number };
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ onClose, currentDate, position }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.top = `${position.top + 10}px`;
      modalRef.current.style.left = `${position.left}px`;
    }
  }, [position]);

  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <h2>Select a Date</h2>
        <p>
          Currently showing: {month} {year}
        </p>
      </div>
    </div>
  );
};

export default DatePickerModal;
