import { Button } from "react-bootstrap";

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
      <Button onClick={onRegisterClicked}>Register</Button>
      <Button onClick={onLoginClicked}>Login</Button>
    </>
  );
};

export default NavBarLoggedOutView;
