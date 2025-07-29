import React from "react";

import { Layout } from "antd";

const { Content } = Layout;

const Audio: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <h1>Manage Your Audio Files</h1>
      </Content>
    </Layout>
  );
};

export default Audio;
