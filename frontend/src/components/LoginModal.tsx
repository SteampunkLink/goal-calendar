import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Form, Alert } from "react-bootstrap";
import { User } from "../models/user";
import { LoginCredentialsInterface } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import TextInput from "./form/TextInput";
import utilStyles from "../styles/Utils.module.css";
import { UnauthorizedError } from "./errors/http_errors";

interface LoginModalPropsInterface {
  onDismiss: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal = ({
  onDismiss,
  onLoginSuccess,
}: LoginModalPropsInterface) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentialsInterface>();

  const onSubmit = async (credentials: LoginCredentialsInterface) => {
    try {
      const newUser = await UsersApi.login(credentials);
      onLoginSuccess(newUser);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <Modal show onHide={onDismiss}>
      <div className={utilStyles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <div className={utilStyles.modalBreak} />
        <Modal.Body>
          {errorText && <Alert variant="danger">{errorText}</Alert>}
          <Form id="loginform" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="username"
              label="Username"
              type="text"
              placeholder="Username"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />
          </Form>
        </Modal.Body>
        <div className={utilStyles.modalBreak} />
        <div className={utilStyles.modalFooter}>
          <button
            type="submit"
            form="loginform"
            disabled={isSubmitting}
            className={utilStyles.customBtn}
          >
            Login
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
