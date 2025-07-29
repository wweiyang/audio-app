import React from "react";
import AudioList from "../../components/AudioList";
import AudioUploadForm from "../../components/AudioUploadForm";
import { Layout } from "antd";
import styles from "./audio.module.scss";
import HeaderMenu from "../../components/HeaderMenu";

const { Content } = Layout;

const Audio: React.FC = () => {
  return (
    <Layout>
      <HeaderMenu />
      <Content className={styles.audio}>
        <h1>Manage Your Audio Files</h1>
        {/* <AudioUploadForm /> */}
        {/* <AudioList /> */}
      </Content>
    </Layout>
  );
};

export default Audio;
