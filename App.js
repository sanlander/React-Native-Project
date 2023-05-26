import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default App = () => {
  const routing = useRoute(true);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
