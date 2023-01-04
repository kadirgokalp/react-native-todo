import { StyleSheet, Text, View, Button } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const HomePage = ({ navigation }) => {
	const [totalCount, setTotalCount] = useState(0)
	const url = "http://192.168.1.103:3000/todos"

	const todos = useSelector((state) => state.getTodo.todos)

	const getTodos = async () => {
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}

		const requestOptions = {
			method: "GET",
			headers: headers,
		}

		await fetch(url, requestOptions)
			.then((data) => data.json())

			.then((parsedData) => {
				setTotalCount(parsedData.length)
				console.log(parsedData.length)
			}) //parsedData.lenght alınacak

			.catch((error) => console.log(error))
	}

	const checkEachItem = (checkItem) => {
		const temp_array = [
			checkTodo ? TODO_CATEGORY.TODO : null,
			checkInProgress ? TODO_CATEGORY.IN_PROGRESS : null,
			checkDone ? TODO_CATEGORY.DONE : null,
		]

		if (temp_array.includes(checkItem.category)) {
			return checkItem
		}
	}

	const checkTodoStatus = () => {
		const result = todos.filter(checkEachItem)
		setNewTodos(result)
		console.log(result)
	}

	const getEachCategoryLength = () => {}

	useEffect(() => {
		getTodos()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text
					style={{
						fontSize: 40,
						color: "#fff",
						fontWeight: "500",
					}}
				>
					TODO APP
				</Text>
			</View>
			<View style={styles.todo_statics}>
				<View style={styles.left_todo}>
					<Text style={styles.todo_text}>TodoS</Text>
					<Text style={styles.todo_text}>Todo : 30</Text>
					<Text style={styles.todo_text}>In Progress : 12</Text>
					<Text style={styles.todo_text}>Done : 24</Text>
				</View>
				<View style={styles.right_todo}>
					<Text style={styles.todo_text}>Overall</Text>
					<Text style={styles.todo_text}>X/{totalCount}</Text>
					<Text style={styles.todo_text}>%T.T</Text>
				</View>
			</View>
			<Button
				title="List Items"
				onPress={() =>
					navigation.navigate("Todos", { language: "turkish" })
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
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
	},
	left_todo: {
		width: "60%",
	},
	right_todo: {},
	todo_text: {
		color: "#fff",
		fontSize: 20,
	},
})

export default HomePage
