import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	TextInput,
	Animated,
	Modal,
} from "react-native"
import { useState, useEffect, useRef } from "react"
import { CheckBox } from "@rneui/themed"
import { ActionSheet, ActionSheetButton } from "react-native-actionsheet"
import { ActionSheetProvider } from "react-native-actionsheet"

// value={isSelected} onValueChange={setIsSelected}

const TodoScreen = () => {
	const [checkTodo, setCheckTodo] = useState(true)
	const [checkInProgress, setCheckInProgress] = useState(true)
	const [checkDone, setCheckDone] = useState(true)

	const [todos, setTodos] = useState([])
	const [apiValue, setApiValue] = useState("")
	const [totalCount, setTotalCount] = useState(0)

	const [newTodos, setNewTodos] = useState([])

	const url = "http://127.0.0.1:3000/todos"

	const postTodos = () => {
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}

		const requestOptions = {
			method: "POST",
			body: JSON.stringify({ content: apiValue, category: 1 }),
			headers: headers,
		}

		fetch(url, requestOptions)
			.then((res) => res.json())
			.then((parsedData) => setTodos(parsedData))
			.catch((error) => console.log(error))
	}

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
				setTodos(parsedData)
				setTotalCount(parsedData.length)
			}) //parsedData.lenght alınacak

			.catch((error) => console.log(error))
	}

	const checkTodoStatus = () => {
		let newArr = []

		if (checkTodo) {
			newArr = todos.filter((todo, index) => {
				return todo.category == 1
			})
			setNewTodos(newArr)
			console.log(newArr)
		}

		if (checkInProgress) {
			newArr = todos.filter((todo, index) => {
				return todo.category == 2
			})
			setNewTodos(newArr)
		}

		if (checkDone) {
			newArr = todos.filter((todo, index) => {
				return todo.category == 3
			})
			setNewTodos(newArr)
		}
	}

	useEffect(() => {
		getTodos()
		checkTodoStatus()
	}, [apiValue, checkDone, checkInProgress, checkTodo])

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
						//marginLeft: -15,
						width: 100,
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
						width: 150,
						marginLeft: -10,
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
						width: 75,
						marginLeft: -10,
					}}
					textStyle={{ color: "#ffffff" }}
					checkedColor="#ffffff"
				/>
			</View>

			<TextInput
				style={styles.textInput}
				value={apiValue}
				placeholder="Enter your new ToDo here..."
				onChangeText={(text) => setApiValue(text)}
			/>
			<Button title="Add a New Todo" onPress={() => setVisible(true)} />
			<View style={styles.list_of_todos}>
				<Text
					style={{
						fontWeight: "700",
						paddingTop: 10,
						paddingBottom: 10,
					}}
				>
					LIST OF TODOS
				</Text>
				<FlatList
					data={todos}
					keyExtractor={({ id }) => id.toString()}
					renderItem={({ item }) => <Text>{item.content}</Text>}
				/>
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
		paddingLeft: 10,
	},
	textInput: {
		marginTop: -20,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: "blue",
	},
})

export default TodoScreen
