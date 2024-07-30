import { FC, useEffect, useState } from "react";
import {
  AimOutlined,
  BarChartOutlined,
  FileOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Menu, Drawer, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const Navbar: FC = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  // Retrieve and parse location data from localStorage
  const locationStore = localStorage.getItem("location");
  const locations = locationStore ? JSON.parse(locationStore) : null;

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setSelectedKey("1");
        break;
      case "/location-manage":
        setSelectedKey("2");
        break;
      case "/dishes":
        setSelectedKey("3");
        break;
      case "/menu":
        setSelectedKey("4");
        break;
      default:
        setSelectedKey("");
    }
  }, [location.pathname]);

  const items = [
    {
      key: "1",
      icon: <UserOutlined style={{ color: "white" }} />,
      label: <Link to="/home">User</Link>,
    },
    {
      key: "2",
      icon: <AimOutlined style={{ color: "white" }} />,
      label: <Link to="/location-manage">Location</Link>,
    },
    {
      key: "3",
      icon: <StarOutlined style={{ color: "white" }} />,
      label: <Link to="/dishes">Dishes</Link>,
    },
    {
      key: "4",
      icon: <SettingOutlined style={{ color: "white" }} />,
      label: "Menu",
    },
  ];

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-brand p-4 lg:hidden">
        <div className="text-white">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={handleDrawerOpen}
          />
        </div>
        <div className="text-white">
          <strong className="mr-2">City:</strong>{" "}
          {locations ? locations.City : "N/A"}
        </div>
      </div>
      <div className="hidden lg:flex gap-4 min-h-full bg-brand flex-col items-center fixed top-0 left-0 w-[130px]">
        <div className="flex text-white pl-10 pt-3">
          <strong className="mr-2">City:</strong>{" "}
          {locations ? locations.City : "N/A"}
        </div>
        <Menu
          className="navbar-menu w-full border-0 bg-brand h-[100vh]"
          mode="inline"
          theme="dark"
          items={items}
          selectedKeys={[selectedKey]}
          style={{ width: 130 }}
        />
      </div>
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={handleDrawerClose}
      >
        <Menu
          mode="inline"
          theme="dark"
          items={items}
          selectedKeys={[selectedKey]}
          onClick={handleDrawerClose}
        />
      </Drawer>
    </div>
  );
};

export default Navbar;
