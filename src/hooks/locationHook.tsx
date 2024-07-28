import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { LocationResponse } from "../types/locationType";

export interface LocationContextType {
  location: LocationResponse | null;
  locationActive: (newLocation: LocationResponse[]) => void;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  locationActive: () => {},
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<any>(null);
  
  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem("location", JSON.stringify(location));
    } else {
      localStorage.removeItem("location");
    }
  }, [location]);
  
  const locationActive = async (newLocation: any) => {
    setLocation(newLocation[0]);
  };
  const value = useMemo<LocationContextType>(
    () => ({
      location,
      locationActive,
    }),
    [location]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  return useContext(LocationContext);
};
