import Sticker from "./Sticker";
import styles from "../styles/StickerDisplay.module.css";

interface StickerDisplayProps {
  style: string;
}

const StickerDisplay = ({ style }: StickerDisplayProps) => {
  const stickerArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className={styles.stickerDisplay}>
      {stickerArray.map((s) => (
        <Sticker key={s} stickerSet={style} stickerNum={s} stickerSize={50} />
      ))}
    </div>
  );
};

export default StickerDisplay;
