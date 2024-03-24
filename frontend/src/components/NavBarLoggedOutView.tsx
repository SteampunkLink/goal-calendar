import utilStyles from "../styles/Utils.module.css";

interface NavBarLoggedOutViewPropsInterface {
  onRegisterClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onRegisterClicked,
  onLoginClicked,
}: NavBarLoggedOutViewPropsInterface) => {
  return (
    <>
      <button className={utilStyles.customBtn} onClick={onRegisterClicked}>
        Register
      </button>
      <button className={utilStyles.customBtn} onClick={onLoginClicked}>
        Login
      </button>
    </>
  );
};

export default NavBarLoggedOutView;
