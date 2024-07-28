import React, { FC } from "react";
import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from "antd";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";

interface LayoutProps extends AntdLayoutProps {
  children: React.ReactNode;
  layoutOnly?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  layoutOnly = false,
  ...otherProps
}) => {
  if (layoutOnly) {
    return <AntdLayout {...otherProps}>{children}</AntdLayout>;
  }
  return (
    <AntdLayout className="min-h-full w-full bg-home-page bg-no-repeat bg-cover relative bg-white">
      <Header />
      <Navbar />
      <AntdLayout className="pl-12 h-full bg-transparent">
        {children}
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
