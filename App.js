import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import { useState, useContext } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryProducts from "./src/pages/CategoryProducts";
import Supermarkets from "./src/pages/Supermarkets";
import Products from "./src/pages/Products";
import Product from "./src/pages/Product";
import ProductSupermarket from "./src/pages/ProductSupermarket";
import Supermarket from "./src/pages/Supermarket";
import ShopCart from "./src/pages/ShopCart";
import ShoppingList from "./src/pages/ShoppingList";
import SupermarketShoppingList from "./src/pages/SupermarketShoppingList";
import Scanner from "./src/pages/QRCodeScanner";
import ShopCartButton from "./src/components/Cart";
import PurchasesHistoric from "./src/pages/PurchasesHistoric";

import { LocationProvider } from "./src/context/LocationProvider";

import IconAD from "react-native-vector-icons/AntDesign";
import IconET from "react-native-vector-icons/Entypo";
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

import { LinearGradient } from "expo-linear-gradient";

import {
  useFonts,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const [state, setState] = useState(null);
  const navigationRef = useNavigationContainerRef();

  // const currenLocation = useContext(currentLocationContext);
  // console.warn("currenLocation:", currenLocation);

  const [fontLoaded] = useFonts({
    OpenSans_500Medium,
    OpenSans_600SemiBold,
  });

  if (!fontLoaded) {
    return <View />;
  }

  function Tabs({ navigation }) {
    if (!state) {
      setState(navigation);
    }
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === "Categorias") {
              return (
                <IconMI
                  style={[focused ? styles.buttonFocus : styles.noFocus]}
                  name="category"
                  size={25}
                />
              );
            } else if (route.name == "Supermercados") {
              return (
                <IconET
                  style={[focused ? styles.buttonFocus : styles.noFocus]}
                  name="shopping-basket"
                  size={25}
                />
              );
            } else if (route.name == "Histórico") {
              return (
                <IconFA
                  style={[focused ? styles.buttonFocus : styles.noFocus]}
                  name="clipboard-list"
                  size={25}
                />
              );
            } else {
              return (
                <IconMCI
                  style={[focused ? styles.buttonFocus : styles.noFocus]}
                  name="qrcode-scan"
                  size={25}
                />
              );
            }
          },
          header: (scene) => {
            const title = scene.route.name;
            return (
              <SafeAreaView>
                <LinearGradient
                  colors={[
                    "#f09c33",
                    "#f59234",
                    "#f98736",
                    "#fd7b38",
                    "#ff6e3c",
                    "#ff5f41",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.headerGradient}
                >
                  <Text style={styles.titlePage}>{title}</Text>
                  <ShopCartButton navigation={navigation} />
                </LinearGradient>
              </SafeAreaView>
            );
          },
          tabBarActiveTintColor: "#f58634",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: "#140f07",
          },
        })}
      >
        <Tab.Screen name="Categorias" component={CategoryProducts} />
        <Tab.Screen name="Supermercados" component={Supermarkets} />
        <Tab.Screen name="Histórico" component={PurchasesHistoric} />
        <Tab.Screen name="Scanner" component={Scanner} />
      </Tab.Navigator>
    );
  }

  function returnShopCart() {
    return <ShopCartButton navigation={state} />;
  }

  const CustomHeader = (title, showCart = true) => {
    return (
      <LinearGradient
        colors={[
          "#f09c33",
          "#f59234",
          "#f98736",
          "#fd7b38",
          "#ff6e3c",
          "#ff5f41",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={
          showCart ? styles.headerGradient : styles.headerGradientAlternative
        }
      >
        <Pressable
          onPress={() => navigationRef.goBack()}
          style={styles.backButton}
        >
          <IconAD name="arrowleft" size={30} style={{ color: "#000" }} />
        </Pressable>
        <Text style={styles.titlePage}>{title}</Text>
        {showCart && returnShopCart()}
      </LinearGradient>
    );
  };

  return (
    <LocationProvider>
      <NavigationContainer style={styles.container} ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name=" "
            component={Tabs}
          />
          <Stack.Screen
            name="Produtos"
            component={Products}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return <SafeAreaView>{CustomHeader(title)}</SafeAreaView>;
              },
            }}
          />
          <Stack.Screen
            name="Produto"
            component={Product}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return <SafeAreaView>{CustomHeader(title)}</SafeAreaView>;
              },
            }}
          />
          <Stack.Screen
            name="Detalhes do Produto"
            component={ProductSupermarket}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return <SafeAreaView>{CustomHeader(title)}</SafeAreaView>;
              },
            }}
          />
          <Stack.Screen
            name="Supermercado"
            component={Supermarket}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return <SafeAreaView>{CustomHeader(title)}</SafeAreaView>;
              },
            }}
          />
          <Stack.Screen
            name="Carrinho"
            component={ShopCart}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return (
                  <SafeAreaView>{CustomHeader(title, false)}</SafeAreaView>
                );
              },
            }}
          />
          <Stack.Screen
            name="Lista de Compras"
            component={ShoppingList}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return (
                  <SafeAreaView>{CustomHeader(title, false)}</SafeAreaView>
                );
              },
            }}
          />
          <Stack.Screen
            name="Supermercados disponíveis"
            component={SupermarketShoppingList}
            options={{
              header: (scene) => {
                const title = scene.route.name;
                return (
                  <SafeAreaView>{CustomHeader(title, false)}</SafeAreaView>
                );
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  titlePage: {
    color: "#000",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 19,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerGradientAlternative: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  noFocus: {
    color: "#fff",
  },
  buttonFocus: {
    color: "#f58634",
  },
  headerCart: {
    marginRight: 20,
  },
});
