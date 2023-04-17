import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoryProducts from './src/pages/CategoryProducts';
import Supermarkets from './src/pages/Supermarkets';
import Products from './src/pages/Products';
import Supermarket from './src/pages/Supermarket';

export default function App() {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

  function Tabs(){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Categorias de Produtos" component={CategoryProducts}/>
        <Tab.Screen name="Supermercados Próximos" component={Supermarkets}/>
      </Tab.Navigator>
    )
  }
  
  return (
    <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name=" " component={Tabs}/>
          <Stack.Screen  name="Produtos" component={Products}/>
          <Stack.Screen  name="Supermercado" component={Supermarket}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
