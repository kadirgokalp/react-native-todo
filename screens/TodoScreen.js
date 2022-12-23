import { StyleSheet, Text, View, Button, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { CheckBox } from "@rneui/themed"
import { color } from "@rneui/themed/dist/config"

// value={isSelected} onValueChange={setIsSelected}

const TodoScreen = () => {
	const [checkTodo, setCheckTodo] = useState(true)
	const [checkInProgress, setCheckInProgress] = useState(true)
	const [checkDone, setCheckDone] = useState(true)

	const [todos, setTodos] = useState([])

	const url = "https://localhost:3000/todos"

	const getTodos = async () => {
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}

		const requestOptions = {
			method: "GET",
			headers: headers,
		}
		const response = await fetch(url, requestOptions).then((data) => {
			console.log(data)
		})
	}

	useEffect(() => {
		getTodos()
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.checkbox_container}>
				<CheckBox
					style={styles.checkbox}
					title="Todo"
					checked={checkTodo}
					onPress={() => setCheckTodo(!checkTodo)}
					containerStyle={{
						backgroundColor: "#1ca96a",
					}}
					textStyle={{ color: "#ffffff" }}
					checkedColor="#ffffff"
				/>
				<CheckBox
					title="In Progress"
					checked={checkInProgress}
					onPress={() => setCheckInProgress(!checkInProgress)}
					containerStyle={{
						backgroundColor: "#1ca96a",
					}}
					textStyle={{ color: "#ffffff" }}
					checkedColor="#ffffff"
				/>
				<CheckBox
					title="Done"
					checked={checkDone}
					onPress={() => setCheckDone(!checkDone)}
					containerStyle={{
						backgroundColor: "#1ca96a",
					}}
					textStyle={{ color: "#ffffff" }}
					checkedColor="#ffffff"
				/>
			</View>
			<Button title="Add a New Todo" />
			<View style={styles.list_of_todos}>
				{/* <FlatList
					data={todos}
					keyExtractor={({ id }) => id.toString()}
					renderItem={({ item }) => <Text>{item.content}</Text>}
				/> */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
		backgroundColor: "#c1111157",
		marginTop: 25,
		borderRadius: 5,
	},
})

export default TodoScreen
