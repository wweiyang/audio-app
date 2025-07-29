import React from "react";
import { Menu, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const HeaderMenu: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname.startsWith("/audio")
    ? "audio"
    : location.pathname.startsWith("/account")
    ? "account"
    : "";

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="audio">
          <Link to="/audio">Audio</Link>
        </Menu.Item>
        <Menu.Item key="account">
          <Link to="/account">Account</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderMenu;
