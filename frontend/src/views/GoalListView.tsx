// import { Container } from "react-bootstrap";
import UserLoggedOut from "../components/UserLoggedOut";
import { User } from "../models/user";
import LoadGoals from "../components/LoadGoals";

interface GoalListPageProps {
  loggedInUser: User | null;
}
const GoalListView = ({ loggedInUser }: GoalListPageProps) => {
  return (
    <div>
      <>
        {loggedInUser ? (
          <LoadGoals directTo="goals" setNewAchievement={null} />
        ) : (
          <UserLoggedOut text="Please log in to view your goals." />
        )}
      </>
    </div>
  );
};

export default GoalListView;
