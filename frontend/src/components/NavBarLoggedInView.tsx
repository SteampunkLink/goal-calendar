import { Link } from "react-router-dom";
import utilStyles from "../styles/Utils.module.css";
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
        <button className={utilStyles.customBtn}>Calendar</button>
      </Link>
      <Link to="/goals">
        <button className={utilStyles.customBtn}>Goals</button>
      </Link>
      <button className={utilStyles.customBtn} onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default NavBarLoggedInView;
