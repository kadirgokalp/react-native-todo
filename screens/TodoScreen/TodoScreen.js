import {
	Text,
	View,
	Button,
	FlatList,
	TextInput,
	Modal,
	Pressable,
	TouchableOpacity,
} from "react-native"
import { styles } from "./TodoScreen.styles"
import { useState, useEffect } from "react"

import { TODO_CATEGORY } from "../../common/Enums"
import TodoCheckBox from "../../components/Checkbox/TodoCheckBox"
import TodoItem from "../../components/TodoItem/TodoItem"
import { useSelector } from "react-redux"
import getTodo from "../../common/api/todo/getTodo"
import postTodo from "../../common/api/todo/postTodo"

const TodoScreen = () => {
	const [checkTodo, setCheckTodo] = useState(true)
	const [checkInProgress, setCheckInProgress] = useState(true)
	const [checkDone, setCheckDone] = useState(true)
	const [modalVisible, setModalVisible] = useState(false)

	const [apiValue, setApiValue] = useState("")
	const [totalCount, setTotalCount] = useState(0)

	const [newTodos, setNewTodos] = useState([])

	const todos = useSelector((state) => state.getTodo.todos)

	useEffect(() => {
		getTodo()
	}, [])

	const postTodos = () => {
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
		const result = todos.filter(checkEachItem) //result ismini değiştir
		setNewTodos(result)
	}

	const handlerenderSingleTodoItem = ({ item }) => {
		return <TodoItem todo_item={item} />
	}

	const handleEmptyInputAsButtonClicked = () => {
		setApiValue("")
	}

	useEffect(() => {
		checkTodoStatus() //EĞER BİR FONKSYİONA PARAMETRE EKLİYOSAN ()=> handle ... şeklinde yazman gerekiypr
	}, [checkDone, checkInProgress, checkTodo])

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

			<TouchableOpacity
				style={styles.todoButton}
				onPress={() => {
					postTodos()
					handleEmptyInputAsButtonClicked()
					setModalVisible(true)
				}}
			>
				<Text style={styles.buttonText}>Add a New Todo</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.")
					setModalVisible(!modalVisible)
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>New Todo Added</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.checkBoxTextStyle}>
								Hide Modal
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

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
					renderItem={handlerenderSingleTodoItem}
				/>
			</View>
		</View>
	)
}

export default TodoScreen
