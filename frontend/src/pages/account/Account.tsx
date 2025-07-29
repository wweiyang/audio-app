import React, { useEffect, useState } from "react";
import { Layout, Table, Button, Modal, Form, Input } from "antd";
import AccountManagement from "../../components/AccountManagement";
import { User } from "../../api";
import { getUsers, createUser, updateUser, deleteUser } from "../../api";
import styles from "./account.module.scss";

const { Content } = Layout;

const Account: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userList = await getUsers();
    setUsers(userList);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    fetchUsers();
  };

  const handleModalOk = async (values: User) => {
    if (currentUser) {
      await updateUser(currentUser.id, values);
    } else {
      await createUser(values);
    }
    setIsModalVisible(false);
    fetchUsers();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Content className={styles.account}>
        <h1>Account Management</h1>
        {/* <AccountManagement /> */}
        <div>
          <Button type="primary" onClick={handleAddUser}>
            Add User
          </Button>
          <Table dataSource={users} rowKey="id">
            <Table.Column title="Name" dataIndex="name" />
            <Table.Column title="Email" dataIndex="email" />
            <Table.Column
              title="Actions"
              render={(text, user) => (
                <>
                  <Button onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button onClick={() => handleDeleteUser(user.id)} danger>
                    Delete
                  </Button>
                </>
              )}
            />
          </Table>
          <Modal
            title={currentUser ? "Edit User" : "Add User"}
            open={isModalVisible}
            onCancel={handleModalCancel}
            footer={null}
          >
            <UserForm
              initialValues={currentUser || { name: "", email: "" }}
              onFinish={handleModalOk}
            />
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

const UserForm: React.FC<{
  initialValues: User;
  onFinish: (values: User) => void;
}> = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  const onFinishForm = (values: User) => {
    onFinish(values);
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinishForm}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Account;
