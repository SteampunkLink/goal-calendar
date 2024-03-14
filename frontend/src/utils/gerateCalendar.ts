interface generateCalendarProps {
  month: number;
  year: number;
}

const generateCalendar = ({ month, year }: generateCalendarProps) => {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();
  const lastDatePrevMonth = new Date(year, month, 0).getDate();

  let dateArr = [];

  for (let i = firstDay - 1; i > -1; i--) {
    // days from previous month
    dateArr.push(new Date(year, month - 1, lastDatePrevMonth - i));
  }
  for (let i = 1; i < lastDate + 1; i++) {
    // days of current month
    dateArr.push(new Date(year, month, i));
  }
  let j = 1;
  for (let i = lastDay; i < 6; i++) {
    // days of next month
    dateArr.push(new Date(year, month + 1, j));
    j++;
  }
  let weeksArr = [];
  let week = 0;
  while (dateArr.length) {
    weeksArr[week] = dateArr.splice(0, 7);
    week++;
  }
  return weeksArr;
};

export default generateCalendar;
