import { Button, Modal } from "antd";
import { useState } from "react";
import axios from "axios";

export default function DeleteUserFunction({ isVisible, onClose, user }) {
  console.log(user._id);
  const id = user._id;
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${id}`);
      console.log("User deleted");

      handleCancel();
    } catch (error) {
      console.log(error);
      handleCancel();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={isVisible} onCancel={handleCancel} footer={null}>
      <p>Are you sure you want to delete {user.name}?</p>
      <Button type="primary" onClick={handleDelete}>
        Yes
      </Button>
      <Button onClick={handleCancel}>No</Button>
    </Modal>
  );
}
