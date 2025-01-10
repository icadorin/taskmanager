import React, { useState } from 'react';
import '../styles/calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {fullCalendarDays.map((day, index) => (
          <div key={index} className="calendar-day">
            {day ? day.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
