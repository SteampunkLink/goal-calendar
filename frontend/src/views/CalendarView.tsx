import { Container } from "react-bootstrap";
import Calendar from "../components/calendar/Calendar";
import UserLoggedOut from "../components/UserLoggedOut";
import { User } from "../models/user";

interface GoalListPageProps {
  loggedInUser: User | null;
}
const GoalListView = ({ loggedInUser }: GoalListPageProps) => {
  return (
    <Container>
      <>
        {loggedInUser ? (
          <Calendar />
        ) : (
          <UserLoggedOut text="Please Log In to View Calendar." />
        )}
      </>
    </Container>
  );
};

export default GoalListView;
