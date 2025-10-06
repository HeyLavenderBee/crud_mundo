import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CrudScreen from "./screens/crud";
import CountryFormScreen from "./screens/form";
import CityFormScreen from "./screens/city_form";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: "#6664a1" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}>
        <Stack.Screen name="Crud Mundo" component={CrudScreen} />
        <Stack.Screen name="Form País" component={CountryFormScreen} />
        <Stack.Screen name="Form Cidade" component={CityFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}