import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import styles from "../../styles/Calendar.module.css";
import monthEnum from "../../utils/monthEnum";
import generateCalendar from "../../utils/gerateCalendar";
import { Achievement } from "../../models/achievement";
import * as AchievementApi from "../../network/achievements_api";
import Sticker from "../Sticker";

const Calendar = () => {
  const today = new Date();
  const [displayedMonth, setDisplayedMonth] = useState(today.getMonth());
  const [displayedYear, setDisplayedYear] = useState(today.getFullYear());
  const [dates, setDates] = useState<Date[][]>([]);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [showAchievementError, setShowAchievementError] = useState(false);

  const getStickers = (
    achievement: Achievement,
    month: number,
    date: number
  ) => {
    const achievementDate = new Date(achievement.dateAchieved);
    return (
      achievementDate.getMonth() === month && achievementDate.getDate() === date
    );
  };

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
    const newDates = generateCalendar({
      month: displayedMonth,
      year: displayedYear,
    });
    setDates(newDates);
    const startDate = newDates[0][0].toISOString();
    const endDate = newDates[newDates.length - 1][6].toISOString();

    const loadAchievements = async () => {
      try {
        setShowAchievementError(false);
        setAchievementsLoading(true);
        const achievementData = await AchievementApi.getMonthsAchievements({
          start: startDate,
          end: endDate,
        });
        setAchievements(achievementData);
      } catch (error) {
        setShowAchievementError(true);
      } finally {
        setAchievementsLoading(false);
      }
    };
    loadAchievements();
  }, [displayedMonth]);
  return (
    <div>
      <div>
        {monthEnum[displayedMonth]} {displayedYear}
        {achievementsLoading && <Spinner />}
        {showAchievementError && (
          <div>An error has occured. Please refresh page.</div>
        )}
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
                  <Link to={`/date/${date.toISOString()}`}>
                    <div className={styles.calendarDateLabel}>
                      <h3>{`${date.getDate()}`}</h3>
                    </div>
                    <div className={styles.stickerArea}>
                      {achievements
                        .filter((a) =>
                          getStickers(a, date.getMonth(), date.getDate())
                        )
                        .map((a) => (
                          <Sticker
                            key={a._id}
                            stickerSet={a.stickerStyle}
                            stickerNum={a.stickerNumber}
                            stickerSize={20}
                          />
                        ))}
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          ))}
      </Container>
    </div>
  );
};

export default Calendar;
