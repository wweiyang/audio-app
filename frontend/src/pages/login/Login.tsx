import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { useAuth } from "../../authentication/useAuth";
import { createUser } from "../../api/apis";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinishLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await login(values);

      message.success("Login successful!");
      navigate("/audio");
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishSignUp = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await createUser(values, "");

      message.success("Sign up successful! Please log in.");
      setIsSignUp(false);
    } catch (error) {
      message.error("Sign up failed. Username may already exist.");
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <Title>{isSignUp ? "Sign Up" : "Login"}</Title>
      <Form
        name={isSignUp ? "signup" : "login"}
        onFinish={isSignUp ? onFinishSignUp : onFinishLogin}
        layout="vertical"
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
          <Button type="primary" htmlType="submit" loading={loading} block>
            {isSignUp ? "Sign Up" : "Log in"}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.toggle}>
        {isSignUp ? (
          <Text>
            Already have an account?{" "}
            <Button type="link" onClick={() => setIsSignUp(false)}>
              Log in
            </Button>
          </Text>
        ) : (
          <Text>
            Don't have an account?{" "}
            <Button type="link" onClick={() => setIsSignUp(true)}>
              Sign Up
            </Button>
          </Text>
        )}
      </div>
    </div>
  );
};

export default Login;
