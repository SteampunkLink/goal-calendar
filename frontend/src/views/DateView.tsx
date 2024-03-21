import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePage from "../components/calendar/DatePage";
import UserLoggedOut from "../components/UserLoggedOut";
import { User } from "../models/user";

interface DateViewPageProps {
  loggedInUser: User | null;
}

type DateViewParams = {
  dateISO: string;
};

const DateView = ({ loggedInUser }: DateViewPageProps) => {
  const { dateISO } = useParams<DateViewParams>();
  return (
    <Container>
      <>
        {loggedInUser && dateISO ? (
          <DatePage dateISO={dateISO} />
        ) : (
          <UserLoggedOut text="Please Log In to View Calendar." />
        )}
      </>
    </Container>
  );
};

export default DateView;
