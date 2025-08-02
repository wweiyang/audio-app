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

  const menuItems = [
    {
      key: "audio",
      label: <Link to="/audio">Audio Files</Link>,
    },
    {
      key: "account",
      label: <Link to="/account">My Account</Link>,
    },
  ];

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ lineHeight: "64px" }}
        items={menuItems}
      />
    </Header>
  );
};

export default HeaderMenu;
