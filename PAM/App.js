import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CrudScreen from "./screens/crud";
import CountryFormScreen from "./screens/form";
import CityFormScreen from "./screens/city_form";
import CountriesScreen from "./screens/countries_screen";
import CitiesScreen from "./screens/cities_screen";
import LoginScreen from "./screens/login_screen";
import RegisterScreen from "./screens/register_screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: "#6664a1" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}>
        {/* O primeiro da lista é o que inicia */}
        <Stack.Screen name="Crud Mundo" component={CrudScreen} />
        <Stack.Screen name="Cidades" component={CitiesScreen} />
        <Stack.Screen name="Países" component={CountriesScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Form País" component={CountryFormScreen} />
        <Stack.Screen name="Form Cidade" component={CityFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}