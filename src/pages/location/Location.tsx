import { Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import "./style.css";
import { LocationResponse } from "../../types/locationType";
import { useLocation } from "../../hooks/locationHook";
import { useNavigate } from "react-router-dom";
import { getAllLocation } from "../../apis/locationApi";

const Location = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { locationActive } = useLocation();
  useEffect(() => {
    getAllLocation()
      .then((res: any) => {
        setLocations(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleLocation = (locationId: number) => {
    const locationFilter = locations.filter(
      (item) => item.LocationID === locationId
    );
    locationActive(locationFilter);
    navigate("/home");
  };

  return (
    <div className="bg-[url('../src/assets/background.jpg')] bg-no-repeat bg-cover opacity-90 h-[100vh]">
      <Card
        title="Select Location"
        bordered={false}
        className="w-[600px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        {loading && <Skeleton active paragraph={{ rows: 6 }} />}
        {locations.map((location, index) => {
          return (
            <Card
              key={index}
              className="mb-5 cursor-pointer card-hover"
              onClick={() => handleLocation(location.LocationID)}
            >
              <div>
                <strong>City:</strong> {location.City}{" "}
              </div>
              <div>
                <strong>Address:</strong> {location.Address}
              </div>
            </Card>
          );
        })}
      </Card>
    </div>
  );
};

export default Location;
