import { Button, Layout, Menu, Spin, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import MainSide from "../components/MainSide";
import { CurrentLoginContext } from "../context/CurrentLogin";

const Main = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { loginInfo } = useContext(CurrentLoginContext);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 로그인 정보를 체크하는 useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      // 2초 후에 실행될 로직
      if (!loginInfo || !loginInfo.userUid) {
        // 로그인 정보가 없으면 로그인 페이지로 리디렉션
        navigate("/login");
      } else {
        setIsLoading(false); // 로그인 정보가 있으면 로딩 상태를 false로 설정
      }
    }, 2000);

    // 컴포넌트 언마운트 시 타이머 제거
    return () => clearTimeout(timer);
  }, [loginInfo, navigate]);

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Spin />
        </div>
      )}
      {!isLoading && (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className=" bg-white hidden lg:inline"
            theme="light"
          >
            <MainSide />
          </Sider>
          <Layout>
            <Header style={{ backgroundColor: colorBgContainer }}></Header>
            <Content
              style={{
                margin: "24px 16px",
                minHeight: 280,
              }}
              className=" rounded-lg"
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default Main;
