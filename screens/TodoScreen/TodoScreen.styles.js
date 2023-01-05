import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 15,
	},

	checkbox_container: {
		height: 60,
		backgroundColor: "#1ca96a",
		flexDirection: "row",
		marginBottom: 50,
		borderRadius: 10,
	},
	list_of_todos: {
		height: "70%",
		backgroundColor: "#1d11c157",
		marginTop: 25,
		borderRadius: 5,
		paddingLeft: 10,
		paddingRight: 10,
	},
	textInput: {
		marginTop: -20,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: "blue",
	},
})
