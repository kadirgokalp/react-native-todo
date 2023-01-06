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

	//----

	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	checkBoxTextStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		marginBottom: 5,
	},
	todoButton: {
		borderWidth: 2,
		borderColor: "#FFFFFF",
		backgroundColor: "#07847c",
		width: "70%",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 50,
		borderRadius: 10,
		height: 50,
	},
})
