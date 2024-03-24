import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import * as UsersApi from "./network/users_api";
import GoalListView from "./views/GoalListView";
import AboutView from "./views/AboutView";
import PageNotFoundView from "./views/PageNotFoundView";
import CalendarView from "./views/CalendarView";

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onRegisterClicked={() => setShowRegisterModal(true)}
          onLoginClicked={() => setShowLoginModal(true)}
          onLogoutSuccess={() => setLoggedInUser(null)}
        />
        <Container>
          <Routes>
            <Route
              path="/"
              element={<CalendarView loggedInUser={loggedInUser} />}
            />
            <Route
              path="/goals"
              element={<GoalListView loggedInUser={loggedInUser} />}
            />
            <Route path="/about" element={<AboutView />} />
            <Route path="/*" element={<PageNotFoundView />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
