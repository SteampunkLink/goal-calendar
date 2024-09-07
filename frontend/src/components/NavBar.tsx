import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import styles from "../styles/Navbar.module.css";

interface NavBarPropsInterface {
  loggedInUser: User | null;
  onRegisterClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccess: () => void;
}

const NavBar = ({
  loggedInUser,
  onRegisterClicked,
  onLoginClicked,
  onLogoutSuccess,
}: NavBarPropsInterface) => {
  return (
    <Navbar className={styles.goalsCalendarNavbar} expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1>Goals Calendar</h1>
        </Navbar.Brand>
        <Navbar.Toggle
          className={styles.navbarToggleBtn}
          aria-controls="main-navbar"
        ></Navbar.Toggle>
        <Navbar.Collapse id="main-navbar" className={styles.navbarDropdown}>
          <Nav>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                // user={loggedInUser}
                onLogoutSuccess={onLogoutSuccess}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onRegisterClicked={onRegisterClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
