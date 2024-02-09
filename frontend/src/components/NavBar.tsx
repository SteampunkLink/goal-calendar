import { Navbar, Container, Nav } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

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
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>Goals Calendar</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"></Navbar.Toggle>
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
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
