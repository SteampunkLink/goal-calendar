import { useForm } from "react-hook-form";
import { Modal, Form, Button } from "react-bootstrap";
import { User } from "../models/user";
import { RegisterCredentialsInterface } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import TextInput from "./form/TextInput";
import utilStyles from "../styles/Utils.module.css";

interface RegisterModalPropsInterface {
  onDismiss: () => void;
  onRegisterSuccess: (user: User) => void;
}
const RegisterModal = ({
  onDismiss,
  onRegisterSuccess,
}: RegisterModalPropsInterface) => {
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
      console.log(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

export default RegisterModal;
