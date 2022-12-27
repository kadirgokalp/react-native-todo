import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	TextInput,
} from "react-native"
import { useState, useEffect } from "react"
import { CheckBox } from "@rneui/themed"
import { ActionSheet, ActionSheetButton } from "react-native-actionsheet"
import { ActionSheetProvider } from "react-native-actionsheet"

// value={isSelected} onValueChange={setIsSelected}

const TodoScreen = () => {
	const [checkTodo, setCheckTodo] = useState(true)
	const [checkInProgress, setCheckInProgress] = useState(true)
	const [checkDone, setCheckDone] = useState(true)

	const [todos, setTodos] = useState([])

	const url = "http://localhost:3000/todos"
	const url2 = "https://randomuser.me/api/?results=5"

	const options = ["Add Todo", "Cancel"]

	const showActionSheet = () => {
		ActionSheet.show(
			{
				options,
				cancelButtonIndex: 1,
				title: "Add Todo",
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					return <TextInput />
				}
			},
		)
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

			.then((parsedData) => setTodos(parsedData))

			.catch((error) => console.log(error))
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
						width: 75,
					}}
					textStyle={{ color: "#ffffff" }}
					checkedColor="#ffffff"
				/>
			</View>
			<Button title="Add a New Todo" onPress={showActionSheet} />
			<View style={styles.list_of_todos}>
				<Text></Text>
				<FlatList
					data={todos}
					keyExtractor={({ id }) => id.toString()}
					renderItem={({ item }) => <Text>{item.results.email}</Text>}
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
	},
})

export default TodoScreen
