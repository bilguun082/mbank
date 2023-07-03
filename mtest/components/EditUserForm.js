import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";

function EditUserFunction({ _id, isVisible, onClose, user }) {
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/user/update/${user._id}`, {
        name: formData.name,
        email: formData.email,
        birthday: formData.birthday,
        status: formData.status,
      });

      onClose();
      console.log(user._id);
    } catch (error) {
      console.log(error);
      handleCancel();
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleCancel = () => {
    onClose();
  };
  return (
    <Modal
      open={isVisible}
      onCancel={() => handleCancel()}
      onOk={handleSubmit}
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <div className="input-type">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="input-type">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            name="email"
            placeholder="E-Mail"
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            value={formData.birthday}
            onChange={(e) =>
              setFormData({ ...formData, birthday: e.target.value })
            }
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            name="birthday"
            placeholder="Birth Date"
          />
        </div>
        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              checked={formData.status === "Active"}
              onChange={() => setFormData({ ...formData, status: "Active" })}
              value="Active"
              id="radioDefault1"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block tet-gray-800"
            >
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              checked={formData.status === "Inactive"}
              onChange={() => setFormData({ ...formData, status: "Inactive" })}
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block tet-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center text-md w-2/6 bg-orange-600 text-white py-2 px-4 border rounded-md hover:bg-orange-600 hover:text-white"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className=" inline-block justify-center text-md w-2/6 bg-orange-600 text-white py-2 px-4 border rounded-md hover:bg-orange-600 hover:text-white"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default EditUserFunction;
