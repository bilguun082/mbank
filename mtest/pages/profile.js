import { useState, useEffect } from "react";
import EditUserFunction from "../components/EditUserForm";
import axios from "axios";
// import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = Cookies.get("id");
        const response = await axios.get(`http://localhost:8000/user/${id}`);
        console.log(response);
        if (response?.statusText === "OK") {
          setUserData(response?.data?.data);
          console.log(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfileClick = () => {
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <div className="py-3 px-10">
      {userData ? (
        <>
          <h2 className="text-l text-center font-bold py-10">
            Hi! {userData.name}
          </h2>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <div className="flex bg-center w-19 items-center justify-center mt-3">
        <button
          className="shadow bg-green-800 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </button>
      </div>
      <div className="mt-10">
        {isEditing ? (
          <EditUserFunction
            // id={userData._id}
            onClose={handleCloseModal}
            isVisible={isModalVisible}
            user={userData}
          />
        ) : null}
      </div>
    </div>
  );
}
