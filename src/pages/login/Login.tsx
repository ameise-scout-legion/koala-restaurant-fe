import { Button, Card, Form, Input, notification } from "antd";
import axiosClient from "../../apis/axiosClient";
import { User, UserResponse } from "../../types/usersType";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { viewUser } from "../../apis/userApi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (value: User) => {
    setLoading(true);
    axiosClient
      .post("/user/login", value)
      .then((res: UserResponse) => {
        const token = res.data.token;
        localStorage.setItem("token", JSON.stringify(token));

        return viewUser();
      })
      .then((res: any) => {
        if (res?.data?.Role !== "Owner") {
          setLoading(false);
          notification.error({
            message: "You don't have permission to login",
          });
          return;
        }

        setLoading(false);
        notification.success({
          message: "Login Success",
        });
        navigate("/location");
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: "Login Failed",
          description: error.message,
        });
      });
  };

  return (
    <>
      <div className="bg-[url('../src/assets/background.jpg')] bg-no-repeat bg-cover opacity-90 h-[100vh]">
        <Card
          title="Login"
          bordered={false}
          className="w-[500px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={handleLogin}
          >
            <Form.Item
              label="Username"
              name="username"
              className="w-full"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="m-0">
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login;
