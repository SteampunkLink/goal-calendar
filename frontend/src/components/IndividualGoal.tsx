import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Goal } from "../models/goal";
import * as GoalsApi from "../network/goals_api";
import Sticker from "./Sticker";
import styles from "../styles/IndividualGoal.module.css";

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
    <>
      {stickerArray.map((s) => (
        <button
          key={s}
          className={styles.stickerSelectButton}
          onClick={() => handleStickerChange(s)}
        >
          <Sticker stickerSet={stickerStyle} stickerNum={s} stickerSize={30} />
        </button>
      ))}
    </>
  ) : (
    <div
      className={styles.individualGoal}
      onClick={() => setStickerSelect(true)}
    >
      <Button
        variant="outline-danger"
        onClick={(e) => {
          e.stopPropagation();
          confirmDelete();
        }}
      >
        <FaTimes />
      </Button>
      {goal.text}
      <Sticker
        stickerSet={stickerStyle}
        stickerNum={stickerNum}
        stickerSize={30}
      />
    </div>
  );
};

export default IndividualGoal;
