interface CalendarProps {
  text: string;
}

const UserLoggedOut = ({ text }: CalendarProps) => {
  return <p>{text}</p>;
};

export default UserLoggedOut;
