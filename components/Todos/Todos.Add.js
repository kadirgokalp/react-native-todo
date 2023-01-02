import React from "react"
import { Text, View, Button, FlatList, TextInput } from "react-native"
import { useState, useEffect } from "react"
import { styles } from "./Todos.Add.styles"

const AddTodos = () => {
	const [todos, setTodos] = useState([])
	const [apiValue, setApiValue] = useState("")
	const [totalCount, setTotalCount] = useState(0)

	const [newTodos, setNewTodos] = useState([])

	const [isModalVisible, setIsModalVisible] = useState(false)

	const url = "http://127.0.0.1:3000/todos"
	const url2 = "http://192.168.1.103:3000/todos"

	const changeModalVisible = (bool) => {
		setIsModalVisible(bool)
	}

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

		fetch(url2, requestOptions)
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

		await fetch(url2, requestOptions)
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
			newArr = todos.filter((todo) => {
				return todo.category === 1
			})
			setNewTodos(newArr)
			// setTodos([...todos, newArr])
			console.log(newArr)
		}

		if (checkInProgress) {
			newArr = todos.filter((todo) => {
				return todo.category == 2
			})
			setNewTodos(newArr)
			console.log(newArr)
		}

		if (checkDone) {
			newArr = todos.filter((todo) => {
				return todo.category == 3
			})
			setNewTodos(newArr)
			console.log(newArr)
		}
	}

	useEffect(() => {
		getTodos()
		checkTodoStatus()
	}, [apiValue, checkDone, checkInProgress, checkTodo])

	return (
		<>
			<View style={styles.addTodoContainer}>
				<TextInput
					style={styles.textInput}
					value={apiValue}
					placeholder="Enter your new ToDo here..."
					placeholderTextColor="#fff"
					onChangeText={(text) => setApiValue(text)}
				/>
				<Button
					title="Add a New Todo"
					onPress={() => {
						postTodos
						changeModalVisible(true)
					}}
				/>
				{/* <Modal
					transparent={true}
					animationType="fade"
					visible={isModalVisible}
					nRequestClose={() => changeModalVisible(false)}
                    >
					<SimpleModal />
				</Modal> */}
			</View>
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
		</>
	)
}

export default AddTodos
