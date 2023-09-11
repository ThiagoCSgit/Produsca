import { useState, useEffect, createContext, useContext } from "react";
import getLocation from "../utils/getLocation";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  async function setPosition() {
    let location = await getLocation();
    setUserLocation(location);
  }

  useEffect(() => {
    setPosition();
  }, []);

  return (
    <LocationContext.Provider value={userLocation}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
