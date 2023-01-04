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
// import { CheckBox } from "@rneui/themed"
import { ActionSheet, ActionSheetButton } from "react-native-actionsheet"
import { ActionSheetProvider } from "react-native-actionsheet"
import { TODO_CATEGORY } from "../../common/Enums"
import TodoCheckBox from "../../components/Checkbox/TodoCheckBox"
import TodoItem from "../../components/TodoItem/TodoItem"
import { useSelector } from "react-redux"
import getTodo from "../../common/api/getTodo"
import postTodo from "../../common/api/postTodo"

// value={isSelected} onValueChange={setIsSelected}

const TodoScreen = () => {
	const [checkTodo, setCheckTodo] = useState(true)
	const [checkInProgress, setCheckInProgress] = useState(true)
	const [checkDone, setCheckDone] = useState(true)

	// const [todos, setTodos] = useState([])
	const [apiValue, setApiValue] = useState("")
	const [totalCount, setTotalCount] = useState(0)

	const [newTodos, setNewTodos] = useState([])

	// const url2 = "http://127.0.0.1:3000/todos"
	// const url = "http://192.168.1.103:3000/todos"

	// const getTodos = async () => {
	// 	const headers = {
	// 		"Content-Type": "application/json",
	// 		Accept: "application/json",
	// 	}

	// 	const requestOptions = {
	// 		method: "GET",
	// 		headers: headers,
	// 	}

	// 	await fetch(url, requestOptions)
	// 		.then((data) => data.json())

	// 		.then((parsedData) => {
	// 			setTodos(parsedData)
	// 			setTotalCount(parsedData.length)
	// 			setNewTodos(parsedData)
	// 		}) //parsedData.lenght alınacak

	// 		.catch((error) => console.log(error))
	// }

	const todos = useSelector((state) => state.getTodo.todos)

	useEffect(() => {
		getTodo()
	}, [])

	const postTodos = () => {
		// const headers = {
		// 	"Content-Type": "application/json",
		// 	Accept: "application/json",
		// }

		// const requestOptions = {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		content: apiValue,
		// 		category: TODO_CATEGORY.TODO,
		// 	}),
		// 	headers: headers,
		// }

		// fetch(url, requestOptions)
		// 	.then((res) => res.json())
		// 	.then((parsedData) => setTodos(parsedData))
		// 	.catch((error) => console.log(error))
		postTodo({ apiValue })
		getTodo()
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

	const renderSingleTodoItem = ({ item }) => <TodoItem todo_item={item} />

	const handleEmptyInputAsButtonClicked = () => {
		setApiValue("")
	}

	useEffect(() => {
		checkTodoStatus()
	}, [checkDone, checkInProgress, checkTodo])

	// useEffect(() => {
	// 	getTodos()
	// }, []) //apiValue

	return (
		<View style={styles.container}>
			<View style={styles.checkbox_container}>
				<TodoCheckBox
					style={styles.checkbox}
					title="Todo"
					checked={checkTodo}
					onPress={() => setCheckTodo(!checkTodo)}
				/>
				<TodoCheckBox
					title="In Progress"
					checked={checkInProgress}
					onPress={() => setCheckInProgress(!checkInProgress)}
				/>
				<TodoCheckBox
					title="Done"
					checked={checkDone}
					onPress={() => setCheckDone(!checkDone)}
				/>
			</View>

			<TextInput
				style={styles.textInput}
				value={apiValue}
				placeholder="Enter your new ToDo here..."
				onChangeText={(text) => setApiValue(text)}
			/>
			<Button
				title="Add a New Todo"
				onPress={() => {
					postTodos()
					handleEmptyInputAsButtonClicked()
				}}
			/>
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
					data={newTodos}
					keyExtractor={({ id }) => id.toString()}
					renderItem={renderSingleTodoItem}
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

export default TodoScreen
