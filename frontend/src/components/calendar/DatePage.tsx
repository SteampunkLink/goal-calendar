import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import monthEnum from "../../utils/monthEnum";
import styles from "../../styles/DatePage.module.css";
import LoadGoals from "../LoadGoals";
import { Achievement } from "../../models/achievement";
import * as AchievementApi from "../../network/achievements_api";

interface DatePageProps {
  dateISO: string;
}

const DatePage = ({ dateISO }: DatePageProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [showAchievementError, setShowAchievementError] = useState(false);
  const dateObj = new Date(dateISO);
  const dateMonthIndex = dateObj.getMonth();

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setShowAchievementError(false);
        setAchievementsLoading(true);
        const achievementData = await AchievementApi.getDaysAchievements({
          date: dateISO,
        });
        setAchievements(achievementData);
      } catch (error) {
        setShowAchievementError(true);
      } finally {
        setAchievementsLoading(false);
      }
    };
    loadAchievements();
  }, []);

  const setNewAchievement = (newAchievement: Achievement) => {
    const newAchievementList = [...achievements, newAchievement];
    setAchievements(newAchievementList);
  };

  return (
    <div className={styles.datePageContainer}>
      <div className={styles.datePageAchievementDisplay}>
        {achievementsLoading && <Spinner />}
        {showAchievementError && (
          <div>An error has occured. Please reload the page.</div>
        )}
        <h2>
          {monthEnum[dateMonthIndex]} {dateObj.getDate()},{" "}
          {dateObj.getFullYear()}
        </h2>
        {achievements.map((a) => (
          <div key={a._id}>
            <h3>{a.goalText}</h3>
          </div>
        ))}
      </div>
      <div className={styles.datePageAchievementForm}>
        <LoadGoals
          directTo="achievement"
          setNewAchievement={setNewAchievement}
        />
      </div>
    </div>
  );
};

export default DatePage;
