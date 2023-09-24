import { View, Image, TouchableOpacity, Text } from "react-native";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

export default function NoData({ message, executeAction }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../images/empty-cart-image.png")}
      />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={styles.buttonRefresh}
        onPress={() => executeAction()}
      >
        <IconMCI name="refresh" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
