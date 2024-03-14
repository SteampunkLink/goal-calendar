import { Container } from "react-bootstrap";
import styles from "../styles/GoalListPage.module.css";
import GoalsPageLoggedInView from "../components/goals/GoalsPageLoggedInView";
import UserLoggedOut from "../components/UserLoggedOut";
import { User } from "../models/user";

interface GoalListPageProps {
  loggedInUser: User | null;
}
const GoalListView = ({ loggedInUser }: GoalListPageProps) => {
  return (
    <Container className={styles.goalListPage}>
      <>
        {loggedInUser ? (
          <GoalsPageLoggedInView />
        ) : (
          <UserLoggedOut text="Please log in to view your goals." />
        )}
      </>
    </Container>
  );
};

export default GoalListView;
