import UtilStyles from "../styles/Utils.module.css";

interface StickerProps {
  stickerSet: string;
  stickerNum: number;
  stickerSize: number;
}

interface AltTextObject {
  [key: string]: any;
}

const stickerPositionArr = [
  [0, 0],
  [0, -1],
  [0, -2],
  [-1, 0],
  [-1, -1],
  [-1, -2],
  [-2, 0],
  [-2, -1],
  [-2, -2],
];

const stickerAltText: AltTextObject = {
  stars: [
    "A red star.",
    "A blue star.",
    "A green star.",
    "A pink star.",
    "A purple star.",
    "An orange star.",
    "A bronze star.",
    "A silver star.",
    "A gold star.",
  ],
  music: [
    "A magenta eighth note.",
    "A magenta treble clef.",
    "A magenta pair of beamed sixteenth notes.",
    "A cyan eighth note.",
    "A cyan treble clef.",
    "A cyan pair of beamed sixteenth notes.",
    "A yellow eighth note.",
    "A yellow treble clef.",
    "A yellow pair of beamed sixteenth notes.",
  ],
  fitness: [
    "A stick figure running.",
    "A stick figure biking.",
    "A stick figure batting at a baseball.",
    "A stick figure dribbling a basketball.",
    "A stick figure kicking a soccerball.",
    "A stick figure deadlifting a barbell.",
    "A stick figure walking.",
    "A stick figure swimming.",
    "A stick figure swinging at a tennis ball with a raquet.",
  ],
  games: [
    "An E-Tank sprite from the Nintendo game 'Megaman'",
    "A mushroom sprite from the Nintendo game 'Super Mario Bros.'",
    "A pizza sprite from the Nintendo game 'Teenage Mutant Ninja Turtles'.",
    "A triple item sprite from the Nintendo game 'Castlevania'.",
    "A blue potion sprite from the Nintendo game 'Legend of Zelda'.",
    "A spade panel sprite from the Nintendo game 'Adventure Island II'.",
    "A barrel sprite from the Nintendo game 'Kid Icarus'.",
    "A green cheese sprite from the Nintendo game 'Ducktails'.",
  ],
};

const Sticker = ({ stickerSet, stickerNum, stickerSize }: StickerProps) => {
  const stickerStyles = {
    backgroundImage: `url(/${stickerSet}.png)`,
    backgroundPositionX: stickerPositionArr[stickerNum][1] * stickerSize,
    backgroundPositionY: stickerPositionArr[stickerNum][0] * stickerSize,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${stickerSize * 3}px ${stickerSize * 3}px`,
    height: `${stickerSize}px`,
    width: `${stickerSize}px`,
  };
  return (
    <div style={stickerStyles}>
      <img
        className={UtilStyles.sronly}
        src={`/${stickerSet}.png`}
        alt={stickerAltText[stickerSet][stickerNum]}
      />
    </div>
  );
};

export default Sticker;
