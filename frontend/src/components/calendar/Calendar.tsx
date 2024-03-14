import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import styles from "../../styles/Calendar.module.css";
import generateCalendar from "../../utils/gerateCalendar";

const monthEnum = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const today = new Date();
  const [displayedMonth, setDisplayedMonth] = useState(today.getMonth());
  const [displayedYear, setDisplayedYear] = useState(today.getFullYear());
  const [dates, setDates] = useState<Date[][]>([]);
  const handleChangeMonth = (val: number) => {
    let newMonthValue = displayedMonth + val;
    if (newMonthValue === -1) {
      setDisplayedYear(displayedYear - 1);
      newMonthValue = 11;
    }
    if (newMonthValue === 12) {
      setDisplayedYear(displayedYear + 1);
      newMonthValue = 0;
    }
    setDisplayedMonth(newMonthValue);
  };
  useEffect(() => {
    setDates(generateCalendar({ month: displayedMonth, year: displayedYear }));
  }, [displayedMonth]);
  return (
    <div>
      <div>
        {monthEnum[displayedMonth]} {displayedYear}
        <div>
          <Button onClick={() => handleChangeMonth(-1)}>
            <FaArrowAltCircleLeft />
          </Button>
          <Button onClick={() => handleChangeMonth(1)}>
            <FaArrowAltCircleRight />
          </Button>
        </div>
      </div>
      <Container>
        <Row>
          <Col>Sun</Col>
          <Col>Mon</Col>
          <Col>Tue</Col>
          <Col>Wed</Col>
          <Col>Thu</Col>
          <Col>Fri</Col>
          <Col>Sat</Col>
        </Row>
        {dates.length &&
          dates.map((week, idw) => (
            <Row key={idw}>
              {week.map((date, idd) => (
                <Col key={idd} className={styles.calendarDate}>
                  <div
                    className={styles.calendarDateLabel}
                  >{`${date.getDate()}`}</div>
                </Col>
              ))}
            </Row>
          ))}
      </Container>
    </div>
  );
};

export default Calendar;
