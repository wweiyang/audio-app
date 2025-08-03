import React, { useState } from "react";
import {
  Layout,
  Button,
  Modal,
  Form,
  Input,
  message,
  Flex,
  Typography,
} from "antd";
import { updateUser, deleteUser, getCurrentUser } from "../../api/apis";
import HeaderMenu from "../../components/HeaderMenu/HeaderMenu";
import { useAuth } from "../../authentication/useAuth";
import { UserCredentials } from "../../api/types";
import styles from "./account.module.scss";
import { TOKEN_KEY } from "../../authentication/AuthProvider";

const { Content } = Layout;
const { Title, Text } = Typography;

const Account: React.FC = () => {
  const { user, logout, setUser } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  if (!user) return null;

  const handleUpdate = async (values: UserCredentials) => {
    try {
      const authToken = localStorage.getItem(TOKEN_KEY);
      if (!authToken) {
        console.error("Authentication token not found.");
        return;
      }

      await updateUser(user.id, values, authToken);
      const updatedUser = await getCurrentUser(authToken);

      setUser(updatedUser);

      message.success("Account updated!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to update account.");
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem(TOKEN_KEY);
      if (!authToken) {
        message.error("Authentication token not found.");
        return;
      }
      await deleteUser(user.id, authToken);

      message.success("Account deleted.");
      setIsModalVisible(false);
      logout();
    } catch (error) {
      message.error("Failed to delete account.");
      console.error("Delete error:", error);
    }
  };

  return (
    <Layout>
      <HeaderMenu />
      <Content className={styles.content}>
        <Flex justify="space-between">
          <Title>Manage Account</Title>
          <Button type="default" onClick={logout}>
            Log out
          </Button>
        </Flex>
        <div className={styles.username}>
          <Text>
            <b>Username:</b> {user.username}
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
            <Button type="primary" htmlType="submit">
              Update Account
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={() => setIsModalVisible(true)} danger>
          Delete Account
        </Button>

        <Modal
          title="Are you sure you want to delete your account?"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          destroyOnHidden
        >
          <Button onClick={handleDelete} danger>
            Yes
          </Button>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Account;
