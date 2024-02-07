import { Modal } from "react-bootstrap";

interface AddCategoryModalProps {
  onDismiss: () => void;
}

const AddCategoryModal = ({ onDismiss }: AddCategoryModalProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default AddCategoryModal;
