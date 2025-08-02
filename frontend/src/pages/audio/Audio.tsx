import React from "react";
import AudioUploadForm from "../../components/AudioUploadForm/AudioUploadForm";
import AudioList from "../../components/AudioList/AudioList";
import { Layout, Typography } from "antd";
import styles from "./audio.module.scss";
import HeaderMenu from "../../components/HeaderMenu/HeaderMenu";

const { Content } = Layout;
const { Title } = Typography;

const Audio: React.FC = () => {
  return (
    <Layout>
      <HeaderMenu />
      <Content className={styles.content}>
        <Title>Manage Audio Files</Title>
        <AudioUploadForm />
        <AudioList />
      </Content>
    </Layout>
  );
};

export default Audio;
