import { Avatar, Popover } from "antd";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userStorage: any = localStorage.getItem("token");
  const user = jwtDecode<
    JwtPayload & { userID: string; username: string; fullName: string }
  >(userStorage);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("location");
    navigate("/");
  };

  const Logout = () => {
    return <div className="cursor-pointer" onClick={handleLogout}>Logout</div>;
  };

  return (
    <div className="flex text-white justify-between bg-[#001529] px-4 h-[50px] items-center">
      <div></div>
      <div className="text-xl">Restaurant Admin</div>
      <Popover
        placement="bottom"
        content={<Logout />}
        className="flex items-center"
      >
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        <div className="ml-2 ">{user?.username}</div>
      </Popover>
    </div>
  );
};

export default Header;
