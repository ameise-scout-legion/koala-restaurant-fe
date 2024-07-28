import { FC, useState } from "react";
import {
  BarChartOutlined,
  CalculatorOutlined,
  FileOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./style.css";
import { useLocation } from "../../hooks/locationHook";

const Navbar: FC = () => {
  const items = [
    {
      key: "1",
      icon: <HomeOutlined style={{ color: "white" }} />,
      label: "Home",
    },
    {
      key: "2",
      icon: <CalculatorOutlined style={{ color: "white" }} />,
      label: "User",
    },
    {
      key: "3",
      icon: <UserOutlined style={{ color: "white" }} />,
      label: "Category",
    },
    {
      key: "4",
      icon: <SettingOutlined style={{ color: "white" }} />,
      label: "Menu",
    },
    {
      key: "5",
      icon: <FileOutlined style={{ color: "white" }} />,
      label: "Dishes",
    },
    {
      key: "6",
      icon: <BarChartOutlined style={{ color: "white" }} />,
      label: "Location",
    },
  ];

  const { location } = useLocation();

  return (
    <>
      <div className="gap-5 w-12 min-h-full bg-brand flex flex-col items-center absolute top-0 left-10">
        <div>
          {/* <MenuOutlined className="bg-success text-text-brand-on text-brand-on-brand flex justify-center items-center h-12 cursor-pointer text-xl w-full" /> */}
          <div className="flex text-white pl-10 pt-2">
            <strong className="mr-2">City:</strong> {location && location.City}
          </div>
        </div>
        <Menu
          className="navbar-menu w-full border-0 bg-brand h-[100vh]"
          mode="inline"
          theme="dark"
          items={items}
          style={{ width: 130 }}
        />
      </div>
    </>
  );
};
export default Navbar;
