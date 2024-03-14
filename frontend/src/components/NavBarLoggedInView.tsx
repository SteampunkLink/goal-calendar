// import { Navbar, Button } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { User } from "../models/user";
import * as UsersApi from "../network/users_api";

interface NavBarLoggedInViewPropsInterface {
  // user: User;
  onLogoutSuccess: () => void;
}

const NavBarLoggedInView = ({
  // user,
  onLogoutSuccess,
}: NavBarLoggedInViewPropsInterface) => {
  const logout = async () => {
    try {
      await UsersApi.logout();
      onLogoutSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link to="/">
        <Button>Calendar</Button>
      </Link>
      <Link to="/goals">
        <Button>Goals</Button>
      </Link>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default NavBarLoggedInView;
