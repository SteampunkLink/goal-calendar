import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Form, Alert } from "react-bootstrap";
import { User } from "../models/user";
import { RegisterCredentialsInterface } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import TextInput from "./form/TextInput";
import utilStyles from "../styles/Utils.module.css";
import { ConflictError } from "./errors/http_errors";

interface RegisterModalPropsInterface {
  onDismiss: () => void;
  onRegisterSuccess: (user: User) => void;
}
const RegisterModal = ({
  onDismiss,
  onRegisterSuccess,
}: RegisterModalPropsInterface) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentialsInterface>();

  const onSubmit = async (credentials: RegisterCredentialsInterface) => {
    try {
      const newUser = await UsersApi.register(credentials);
      onRegisterSuccess(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
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
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <div className={utilStyles.modalBreak} />
        <Modal.Body>
          <Form id="registerform" onSubmit={handleSubmit(onSubmit)}>
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
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
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
            form="registerform"
            disabled={isSubmitting}
            className={utilStyles.customBtn}
          >
            Register
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
