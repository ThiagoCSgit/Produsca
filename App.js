import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import { useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const [state, setState] = useState(null);
  const navigationRef = useNavigationContainerRef();

  const [fontLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
  });

  if (!fontLoaded) {
    return <View />;
  }

  function updateState(navigation) {
    setState(navigation);
  }

  function Tabs({ navigation }) {
    if (!state) {
      setTimeout(() => {
        updateState(navigation), 100;
      });
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
                  colors={["#F8FCFA", "#EDF8F3", "#D3EEE1"]}
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
          tabBarActiveTintColor: "#253D4E",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: "#D4EEE2",
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
        colors={["#F8FCFA", "#EDF8F3", "#D3EEE1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={
          showCart ? styles.headerGradient : styles.headerGradientAlternative
        }
      >
        <Pressable onPress={() => navigationRef.goBack()}>
          <IconAD name="arrowleft" size={30} style={{ color: "#253D4E" }} />
        </Pressable>
        <Text style={styles.titlePage}>{title}</Text>
        {showCart && returnShopCart()}
      </LinearGradient>
    );
  };

  const toastConfig = {
    info: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#3fc3ee" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontFamily: "OpenSans_400Regular",
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "OpenSans_400Regular",
        }}
      />
    ),
  };

  return (
    <>
      <LocationProvider>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
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
              name="Detalhes do produto"
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
      <Toast config={toastConfig} />
    </>
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
    color: "#253D4E",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 19,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerGradientAlternative: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  noFocus: {
    color: "#79AF96",
  },
  buttonFocus: {
    color: "#253D4E",
  },
  headerCart: {
    marginRight: 20,
  },
});
