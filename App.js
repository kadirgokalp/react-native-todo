import HomeScreen from "./screens/HomeScreen/HomeScreen"
import TodoScreen from "./screens/TodoScreen/TodoScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from "react-redux"
import store from "./redux/store"

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: "Welcome to Todo Application",
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen name="Todos" component={TodoScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
