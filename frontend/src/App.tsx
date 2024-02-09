import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/GoalListPage.module.css";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import * as UsersApi from "./network/users_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoggedInUser();
  }, []);
  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onRegisterClicked={() => setShowRegisterModal(true)}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccess={() => setLoggedInUser(null)}
      />
      <Container className={styles.goalListPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showRegisterModal && (
        <RegisterModal
          onDismiss={() => setShowRegisterModal(false)}
          onRegisterSuccess={(user) => {
            setLoggedInUser(user);
            setShowRegisterModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
