import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";
import Location from "./pages/location/Location";
import { LocationProvider } from "./hooks/locationHook";

function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/location" element={<Location />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;
