import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";
import Location from "./pages/location/Location";
import { LocationProvider } from "./hooks/locationHook";
import LocationManage from "./pages/locationManage/LocationManage";
import Dishes from "./pages/dishes/Dishes";

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/location" element={<Location />} />
          <Route path="/location-manage" element={<LocationManage />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
