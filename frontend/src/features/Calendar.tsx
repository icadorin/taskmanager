import React, { useState } from 'react';
import DatePickerModal from './DatePickerModal';
import '../styles/calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { firstDayOfMonth };
  };

  const generateCalendar = (year: number, month: number) => {
    const { firstDayOfMonth } = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const previousMonthDays: (Date | null)[] = [];
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      previousMonthDays.push(new Date(year, month - 1, previousMonthLastDay - i));
    }

    const nextMonthDays: (Date | null)[] = [];
    const remainingCells = 42 - (previousMonthDays.length + daysInMonth.length);
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }

    let allCalendarDays: (Date | null)[] = [
      ...previousMonthDays,
      ...daysInMonth,
      ...nextMonthDays,
    ];

    while (allCalendarDays.length < 42) {
      allCalendarDays.push(null);
    }

    return allCalendarDays;
  };

  const fullCalendarDays = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleOpenDatePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.bottom, left: rect.left });
    setShowDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} className="button-select-month">&lt;</button>
        <h2>
          <button onClick={handleOpenDatePicker} className="button-get-month" >
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </button>
        </h2>
        <button onClick={handleNextMonth} className="button-select-month">&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {fullCalendarDays.map((day, index) => {
          const isInCurrentMonth = day && isCurrentMonth(day);
          return (
            <div
              key={index}
              className={`calendar-day ${!day ? '' : !isInCurrentMonth ? 'inactive' : ''}`}
            >
              {day ? day.getDate() : ''}
            </div>
          );
        })}
      </div>
      {showDatePicker && (
        <DatePickerModal
          onClose={handleCloseDatePicker}
          currentDate={currentDate}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default Calendar;
