import React from "react";
import AudioUploadForm from "../../components/AudioUploadForm";
import AudioList from "../../components/AudioList";
import { Layout } from "antd";
import styles from "./audio.module.scss";
import HeaderMenu from "../../components/HeaderMenu";

const { Content } = Layout;

const Audio: React.FC = () => {
  return (
    <Layout>
      <HeaderMenu />
      <Content className={styles.content}>
        <h1 className={styles.header}>Manage Audio Files</h1>
        <AudioUploadForm />
        <AudioList />
      </Content>
    </Layout>
  );
};

export default Audio;
