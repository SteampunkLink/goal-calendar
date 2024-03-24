import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Goal } from "../../models/goal";
import * as GoalsApi from "../../network/goals_api";
import Sticker from "../Sticker";
import styles from "../../styles/IndividualGoal.module.css";
import utilStyles from "../../styles/Utils.module.css";

interface IndividualGoalProps {
  categoryId: string;
  stickerStyle: string;
  goal: Goal;
  onGoalDelete: (goalId: string) => void;
}

const IndividualGoal = ({
  categoryId,
  stickerStyle,
  goal,
  onGoalDelete,
}: IndividualGoalProps) => {
  const stickerArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [stickerSelect, setStickerSelect] = useState(false);
  const [stickerNum, setStickerNum] = useState(goal.sticker);
  const confirmDelete = async () => {
    await GoalsApi.deleteGoal(categoryId, goal._id);
    onGoalDelete(goal._id);
  };
  const handleStickerChange = async (sticker: number) => {
    GoalsApi.updateSticker(categoryId, goal._id, sticker);
    setStickerNum(sticker);
    setStickerSelect(false);
  };
  return stickerSelect ? (
    <div className={styles.stickerSelectRow}>
      {stickerArray.map((s) => (
        <button
          key={s}
          className={utilStyles.customBtn}
          onClick={() => handleStickerChange(s)}
        >
          <Sticker stickerSet={stickerStyle} stickerNum={s} stickerSize={30} />
        </button>
      ))}
    </div>
  ) : (
    <div
      className={styles.individualGoal}
      onClick={() => setStickerSelect(true)}
    >
      <button
        className={utilStyles.customBtn}
        onClick={() => {
          confirmDelete();
        }}
      >
        <FaTimes color="red" />
      </button>
      <button
        className={utilStyles.customBtn}
        onClick={() => setStickerSelect(true)}
      >
        <Sticker
          stickerSet={stickerStyle}
          stickerNum={stickerNum}
          stickerSize={20}
        />
      </button>
      {goal.text}
    </div>
  );
};

export default IndividualGoal;
