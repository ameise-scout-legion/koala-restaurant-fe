import { Button, Card, Form, Input, notification } from "antd";
import axiosClient from "../../apis/axiosClient";
import { User, UserResponse } from "../../types/usersType";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (value: User) => {
    axiosClient.post("/user/login", value).then((res: UserResponse) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      notification.success({
        message: "Login Success",
      });
      navigate("/location");
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
              <Button type="primary" htmlType="submit">
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
