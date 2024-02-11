import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Form, Button, Alert } from "react-bootstrap";
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
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className={utilStyles.width100}
          >
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
