import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
		marginTop: 0,
		padding: 15,
	},
	header: {
		height: 100,
		width: "100%",
		marginTop: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#cc2f1d",
		borderRadius: 50,
	},
	todo_statics: {
		height: "30%",
		backgroundColor: "#7f54c8",
		color: "#fff",
		borderRadius: 5,
		marginBottom: 100,
		marginTop: 100,
		flexDirection: "row",
		padding: 10,
	},
	left_todo: {
		width: "60%",
	},
	right_todo: {},
	todo_text: {
		color: "#fff",
		fontSize: 20,
		marginBottom: 5,
	},

	todo_headers: {
		marginBottom: 12,
		color: "#fff",
		fontSize: 20,
		fontWeight: "600",
	},
})
