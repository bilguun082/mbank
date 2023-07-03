import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import Navbar from "../components/Navbar";
import { green } from "@ant-design/colors";
import EditUserFunction from "../components/EditUserForm";
import DeleteUserFunction from "../components/DeleteUserForm";

const { Column } = Table;

const App = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // const userInfo = (_id) => {
  //   axios
  //     .get(`http://localhost:8000/user/${_id}`)
  //     .then((response) => {
  //       setUser(response.data.data);
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleEdit = (rowData) => {
    setUser({ ...rowData });
    setIsModalVisible(true);
  };

  const handleDelete = (rowData) => {
    setUser({ ...rowData });
    setIsDeleteModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  const handleDeleteCloseModal = () => {
    setIsDeleteModalVisible(false);
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <EditUserFunction
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        user={user}
      />
      <DeleteUserFunction
        isVisible={isDeleteModalVisible}
        onClose={handleDeleteCloseModal}
        user={user}
      />
      <div>
        <div style={{ marginTop: "20px" }}>
          <Table dataSource={data} style={{ margin: "50px" }}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="E-mail" dataIndex="email" key="email" />
            <Column title="Birthday" dataIndex="birthday" key="birthday" />
            <Column title="Status" dataIndex="status" key="status" />
            <Column
              title="Action"
              key="action"
              render={(_, user) => (
                <Space size="middle">
                  <a onClick={() => handleEdit(user)}>Edit {user.lastName}</a>
                  <a onClick={() => handleDelete(user)}>Delete</a>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
