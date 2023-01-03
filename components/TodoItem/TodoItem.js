import React from "react"
import { Text } from "react-native"
import { styles } from "./TodoItem.styles"

const TodoItem = ({ todo_item }) => {
	return (
		<>
			<Text style={styles.todo_item}>{todo_item.content}</Text>
		</>
	)
}

export default TodoItem
