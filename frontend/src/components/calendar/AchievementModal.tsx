import { Modal } from "react-bootstrap";
import utilStyles from "../../styles/Utils.module.css";
import styles from "../../styles/AchievementModal.module.css";
import LoadGoals from "../LoadGoals";
import { Achievement } from "../../models/achievement";
import Sticker from "../Sticker";
import monthEnum from "../../utils/monthEnum";

interface AchivementModalProps {
  onDismiss: () => void;
  selectedDate: Date;
  achievements: Achievement[];
  addNewAchievement: (newAchievement: Achievement) => void;
}

const AchievementModal = ({
  onDismiss,
  selectedDate,
  achievements,
  addNewAchievement,
}: AchivementModalProps) => {
  const setNewAchievement = (newAchievement: Achievement) => {
    addNewAchievement(newAchievement);
    onDismiss();
  };
  return (
    <Modal show onHide={onDismiss}>
      <div className={utilStyles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Achievements for {monthEnum[selectedDate.getMonth()]}{" "}
            {selectedDate.getDate()}, {selectedDate.getFullYear()}
          </Modal.Title>
        </Modal.Header>
        <div className={utilStyles.modalBreak} />
        <div className={styles.achievementModal}>
          <LoadGoals
            directTo="achievement"
            setNewAchievement={setNewAchievement}
            selectedDate={selectedDate}
          />
        </div>
        <div className={utilStyles.modalBreak} />
        <div className={styles.achievementList}>
          <h2>Achievements</h2>
          {achievements.map((a) => (
            <div key={a._id} className={styles.achievementListItem}>
              <Sticker
                stickerSet={a.stickerStyle}
                stickerNum={a.stickerNumber}
                stickerSize={20}
              />
              <h3>{a.goalText}</h3>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AchievementModal;
