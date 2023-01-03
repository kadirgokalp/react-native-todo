import React from "react"
import { CheckBox } from "@rneui/themed"

const TodoCheckBox = ({ title, isChecked, onPress }) => {
	return (
		<CheckBox
			// style={styles.checkbox}
			title={title}
			checked={isChecked}
			onPress={onPress}
			textStyle={{ color: "#ffffff" }}
			checkedColor="#2e24b6"
			uncheckedColor="#ffffff"
			center
			containerStyle={{
				backgroundColor: "#1ca96a",
				marginLeft: 1,
				width: 118,
			}}
		/>
	)
}

export default TodoCheckBox
