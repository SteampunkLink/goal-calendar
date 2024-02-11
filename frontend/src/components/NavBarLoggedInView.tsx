import { Navbar, Button } from "react-bootstrap";
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";

interface NavBarLoggedInViewPropsInterface {
  user: User;
  onLogoutSuccess: () => void;
}

const NavBarLoggedInView = ({
  user,
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
      <Navbar.Text className="me-2">Signed in as {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default NavBarLoggedInView;
