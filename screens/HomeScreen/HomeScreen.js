import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { TODO_CATEGORY } from "../../common/Enums"
import { styles } from "./HomeScreen.styles"

const HomePage = ({ navigation }) => {
	const [totalCount, setTotalCount] = useState(0)
	const url = "http://192.168.1.103:3000/todos"
	const url2 = "http://localhost:3000/todos"

	const [todoCount, setTodoCount] = useState(0) //count olacak
	const [inProgressCount, setInProgressCount] = useState(0)
	const [doneCount, setDoneCount] = useState(0)
	const [todoDonePercentage, setTodoDonePercentage] = useState(0)

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

		await fetch(url2, requestOptions)
			.then((data) => data.json())

			.then((parsedData) => {
				setTotalCount(parsedData.length)
			}) //parsedData.lenght alınacak

			.catch((error) => console.log(error))
	}

	const getEachCategoryLength = () => {
		let newTodoArr = [] //const olacak
		let newInProgressArr = []
		let newDoneArr = []
		let percentage

		newTodoArr = todos.filter((todo) => {
			return todo.category == TODO_CATEGORY.TODO
		}) //.length olarak yapabilirsin
		setTodoCount(newTodoArr.length)

		newInProgressArr = todos.filter((todo) => {
			return todo.category == TODO_CATEGORY.IN_PROGRESS
		})
		setInProgressCount(newInProgressArr.length)
		newDoneArr = todos.filter((todo) => {
			return todo.category == TODO_CATEGORY.DONE
		})
		setDoneCount(newDoneArr.length)

		percentage = ((newDoneArr.length / totalCount) * 100).toFixed(1)

		setTodoDonePercentage(percentage)
	}

	const handleNavigate = () => {
		navigation.navigate("Todos", { language: "turkish" })
	}

	useEffect(() => {
		getTodos()
	}, [])

	useEffect(() => {
		getEachCategoryLength()
	}, [todos])

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
					<Text style={styles.todo_headers}>TODO LENGTHS</Text>
					<Text style={styles.todo_text}>Todo : {todoCount}</Text>
					<Text style={styles.todo_text}>
						In Progress : {inProgressCount}
					</Text>
					<Text style={styles.todo_text}>Done : {doneCount}</Text>
				</View>

				<View style={styles.right_todo}>
					<Text style={styles.todo_headers}>OVERALL</Text>
					<Text style={styles.todo_text}>
						{doneCount}/{totalCount}
					</Text>
					<Text style={styles.todo_text}>% {todoDonePercentage}</Text>
				</View>
			</View>

			<TouchableOpacity
				style={styles.homeButton}
				onPress={handleNavigate}
			>
				<Text style={styles.todo_text}>List Items</Text>
			</TouchableOpacity>
		</View>
	)
}

export default HomePage
