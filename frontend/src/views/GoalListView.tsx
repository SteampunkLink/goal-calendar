import { Container } from "react-bootstrap";
import styles from "../styles/GoalListPage.module.css";
import UserLoggedOut from "../components/UserLoggedOut";
import { User } from "../models/user";
import LoadGoals from "../components/LoadGoals";

interface GoalListPageProps {
  loggedInUser: User | null;
}
const GoalListView = ({ loggedInUser }: GoalListPageProps) => {
  return (
    <Container className={styles.goalListPage}>
      <>
        {loggedInUser ? (
          <LoadGoals directTo="goals" />
        ) : (
          <UserLoggedOut text="Please log in to view your goals." />
        )}
      </>
    </Container>
  );
};

export default GoalListView;
