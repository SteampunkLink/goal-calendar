import { useState } from "react";
import { Achievement } from "../../models/achievement";
import Sticker from "../Sticker";
import styles from "../../styles/Calendar.module.css";

interface DateCellProps {
  className: string;
  activateModal: () => void;
  dateLabel: number;
  achievementArr: Achievement[];
}

const DateCell = ({
  className,
  activateModal,
  dateLabel,
  achievementArr,
}: DateCellProps) => {
  const [displayedAchievement, setDisplayedAchievement] = useState("");
  const handleMouseOver = (aid: string) => {
    const selectedAchivement = achievementArr.find((a) => a._id === aid);
    if (selectedAchivement) {
      setDisplayedAchievement(selectedAchivement?.goalText);
    } else {
      setDisplayedAchievement("");
    }
  };
  const handleMouseLeave = () => setDisplayedAchievement("");
  return (
    <div className={className} onClick={() => activateModal()}>
      <div className={styles.calendarDateLabel}>{dateLabel}</div>
      <div className={styles.stickerArea}>
        {achievementArr.map((a, idx) => (
          <span
            key={idx}
            onMouseOver={() => handleMouseOver(a._id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <Sticker
              key={a._id}
              stickerSet={a.stickerStyle}
              stickerNum={a.stickerNumber}
              stickerSize={20}
            />
          </span>
        ))}
      </div>
      <div className={styles.achievementArea}>{displayedAchievement}</div>
    </div>
  );
};

export default DateCell;
