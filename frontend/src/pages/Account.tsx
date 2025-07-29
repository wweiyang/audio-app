import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Account: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <h1>Account Management</h1>
      </Content>
    </Layout>
  );
};

export default Account;
