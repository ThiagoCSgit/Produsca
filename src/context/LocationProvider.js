import { useState, useEffect, createContext, useContext } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("A permissão para acessar o local foi negada");
      return;
    }

    console.log("pegando localização");

    let location = await Location.getCurrentPositionAsync({});
    console.warn("localização:", location);
    setUserLocation(location);
  }

  useEffect(() => {
    getLocation();
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
