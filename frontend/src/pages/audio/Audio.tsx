import React from "react";
import { Layout } from "antd";
import styles from "./audio.module.scss";

const { Content } = Layout;

const Audio: React.FC = () => {
  return (
    <Layout>
      <Content className={styles.audio}>
        <h1>Manage Your Audio Files</h1>
      </Content>
    </Layout>
  );
};

export default Audio;
