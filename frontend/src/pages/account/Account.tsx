import React, { useState } from "react";
import { Layout, Button, Modal, Form, Input, message } from "antd";
import { updateUser, deleteUser } from "../../api/apis";
import HeaderMenu from "../../components/HeaderMenu";
import { useAuth } from "../../authentication/useAuth";
import { UserCredentials } from "../../api/types";
import styles from "./account.module.scss";

const { Content } = Layout;

const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleUpdate = async (values: UserCredentials) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found.");
        setLoading(false);
        return;
      }
      await updateUser(user.id, values, token);
      message.success("Account updated!");
    } catch (error) {
      message.error("Failed to update account.");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication token not found.");
        setLoading(false);
        return;
      }
      await deleteUser(user.id, token);
      message.success("Account deleted.");
      setIsModalVisible(false);
      logout();
    } catch (error) {
      message.error("Failed to delete account.");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <HeaderMenu />
      <Content className={styles.content}>
        <h1 className={styles.header}>Account</h1>
        <p>
          <b>Username:</b> {user.username}
        </p>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ username: user.username }}
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Account
            </Button>
          </Form.Item>
        </Form>
        <Button
          onClick={() => setIsModalVisible(true)}
          danger
          loading={loading}
        >
          Delete Account
        </Button>

        <Modal
          title="Are you sure you want to delete your account?"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          destroyOnHidden
        >
          <Button onClick={handleDelete} danger loading={loading}>
            Yes
          </Button>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Account;
