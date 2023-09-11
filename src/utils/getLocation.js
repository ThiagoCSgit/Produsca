import * as Location from "expo-location";

export default async function getLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("A permissão para acessar o local foi negada");
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  return location;
}
