import utilStyles from "../styles/Utils.module.css";
interface CalendarProps {
  text: string;
}

const UserLoggedOut = ({ text }: CalendarProps) => {
  return (
    <div className={utilStyles.displayBox}>
      <div className={utilStyles.flexCenter}>
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default UserLoggedOut;
