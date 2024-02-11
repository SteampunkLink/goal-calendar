import { Container } from "react-bootstrap";
import styles from "../styles/GoalListPage.module.css";
import GoalsPageLoggedInView from "../components/GoalsPageLoggedInView";
import GoalsPageLoggedOutView from "../components/GoalsPageLoggedOutView";
import { User } from "../models/user";

interface GoalListPageProps {
  loggedInUser: User | null;
}
const GoalListView = ({ loggedInUser }: GoalListPageProps) => {
  return (
    <Container className={styles.goalListPage}>
      <>
        {loggedInUser ? <GoalsPageLoggedInView /> : <GoalsPageLoggedOutView />}
      </>
    </Container>
  );
};

export default GoalListView;
