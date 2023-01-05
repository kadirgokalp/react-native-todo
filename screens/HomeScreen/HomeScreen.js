import { StyleSheet, Text, View, Button } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { TODO_CATEGORY } from "../../common/Enums"
import { styles } from "./HomeScreen.styles"

const HomePage = ({ navigation }) => {
	const [totalCount, setTotalCount] = useState(0)
	const url = "http://192.168.1.103:3000/todos"

	const [todoLength, setTodoLength] = useState(0)
	const [inProgressLength, setInProgressLength] = useState(0)
	const [doneLength, setDoneLength] = useState(0)
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

		await fetch(url, requestOptions)
			.then((data) => data.json())

			.then((parsedData) => {
				setTotalCount(parsedData.length)
				console.log(parsedData.length)
			}) //parsedData.lenght alınacak

			.catch((error) => console.log(error))
	}

	const getEachCategoryLength = () => {
		let newTodoArr = []
		let newInProgressArr = []
		let newDoneArr = []
		let percentage

		newTodoArr = todos.filter((todo) => {
			return todo.category == TODO_CATEGORY.TODO
		})
		setTodoLength(newTodoArr.length)

		newInProgressArr = todos.filter((todo) => {
			return todo.category == TODO_CATEGORY.IN_PROGRESS
		})
		setInProgressLength(newInProgressArr.length)
		newDoneArr = todos.filter((todo) => {
			return todo.category == TODO_CATEGORY.DONE
		})
		setDoneLength(newDoneArr.length)

		percentage = ((newDoneArr.length / totalCount) * 100).toFixed(1)

		setTodoDonePercentage(percentage)
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
					<Text style={styles.todo_text}>Todo : {todoLength}</Text>
					<Text style={styles.todo_text}>
						In Progress : {inProgressLength}
					</Text>
					<Text style={styles.todo_text}>Done : {doneLength}</Text>
				</View>

				<View style={styles.right_todo}>
					<Text style={styles.todo_headers}>OVERALL</Text>
					<Text style={styles.todo_text}>
						{doneLength}/{totalCount}
					</Text>
					<Text style={styles.todo_text}>% {todoDonePercentage}</Text>
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

export default HomePage
