import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import styles from "../../styles/Calendar.module.css";
import utilStyles from "../../styles/Utils.module.css";
import monthEnum from "../../utils/monthEnum";
import generateCalendar from "../../utils/gerateCalendar";
import { Achievement } from "../../models/achievement";
import * as AchievementApi from "../../network/achievements_api";
import DateCell from "./DateCell";
import AchievementModal from "./AchievementModal";

const Calendar = () => {
  const today = new Date();
  const [displayedMonth, setDisplayedMonth] = useState(today.getMonth());
  const [displayedYear, setDisplayedYear] = useState(today.getFullYear());
  const [dates, setDates] = useState<Date[][]>([]);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [showAchievementError, setShowAchievementError] = useState(false);

  const [modalDate, setModalDate] = useState<Date | null>(null);

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

  const handleAddNewAchievement = (newAchievement: Achievement) => {
    const updatedAchievementList = [...achievements, newAchievement];
    setAchievements(updatedAchievementList);
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
        {achievementsLoading && <Spinner />}
        {showAchievementError && (
          <div>An error has occured. Please refresh page.</div>
        )}
        <div className={styles.mainControls}>
          <button
            className={utilStyles.customBtn}
            onClick={() => handleChangeMonth(-1)}
          >
            <FaArrowAltCircleLeft />
          </button>
          <h2 className={utilStyles.displayBox}>
            {monthEnum[displayedMonth]} {displayedYear}
          </h2>
          <button
            className={utilStyles.customBtn}
            onClick={() => handleChangeMonth(1)}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>
      <div className={styles.calendarContainer}>
        <div className={styles.headerRow}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {dates.length &&
          dates.map((week, idw) => (
            <div key={idw} className={styles.calendarWeek}>
              {week.map((date, idd) => (
                <DateCell
                  key={idd}
                  className={
                    date.getMonth() === displayedMonth
                      ? styles.calendarDay
                      : styles.otherMonth
                  }
                  activateModal={() => setModalDate(date)}
                  dateLabel={date.getDate()}
                  achievementArr={achievements.filter((a) =>
                    getStickers(a, date.getMonth(), date.getDate())
                  )}
                />
              ))}
            </div>
          ))}
      </div>
      {modalDate && (
        <AchievementModal
          onDismiss={() => setModalDate(null)}
          selectedDate={modalDate}
          achievements={achievements.filter((a) =>
            getStickers(a, modalDate.getMonth(), modalDate.getDate())
          )}
          addNewAchievement={handleAddNewAchievement}
        />
      )}
    </div>
  );
};

export default Calendar;
