import React from "react";
import { Layout } from "antd";
import styles from "./account.module.scss";

const { Content } = Layout;

const Account: React.FC = () => {
  return (
    <Layout>
      <Content className={styles.account}>
        <h1>Account Management</h1>
      </Content>
    </Layout>
  );
};

export default Account;
